from rest_framework import serializers

from clues.models import Clues as CluesModel, TreasureHunt, Participant, AttributedClues

from clues.models import TreasureHuntInstance

class Base64ImageField(serializers.FileField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """
    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12]  # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(header)

            complete_file_name = "%s.%s" % (file_name, file_extension,)

            data = ContentFile(decoded_file, name=complete_file_name)

            return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, decoded_file):
        from mimetypes import guess_extension, guess_type
        extension = guess_extension(guess_type(decoded_file + ';base64,')[0])
        extension = "jpg" if extension == "jpeg" else extension

        return extension


class CluesCreationSerializer(serializers.Serializer):
    message = serializers.CharField(min_length=0)
    file = Base64ImageField(
        max_length=None, use_url=True,
    )
    final = serializers.BooleanField(default=False)

    class Meta:
        model = CluesModel
        fields = ('message', 'final')


class CluesSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField()
    message = serializers.CharField(min_length=0)
    code = serializers.CharField(min_length=0)
    file = Base64ImageField(
        max_length=None, use_url=True,
    )
    final = serializers.BooleanField()

    class Meta:
        model = CluesModel
        fields = ('id', 'message', 'code', 'file', 'final')

class SmallCluesSerializer(serializers.ModelSerializer):
    message = serializers.CharField(min_length=0)
    file = Base64ImageField(
        max_length=None, use_url=True,
    )
    final = serializers.BooleanField()

    class Meta:
        model = CluesModel
        fields = ('message', 'file', 'final')
