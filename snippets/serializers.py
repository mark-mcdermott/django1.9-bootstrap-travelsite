from rest_framework import serializers
from models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES

# class SnippetSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
# 
#     title = serializers.CharField(
#         required=False, allow_blank=True, max_length=100)
# 
#     code = serializers.CharField(style={'base_template': 'textarea.html'})
# 
#     linenos = serializers.BooleanField(required=False)
# 
#     language = serializers.ChoiceField(
#         choices=LANGUAGE_CHOICES, default='python')
# 
#     style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')
# 
#     def create(self, validated_data):
#         return Snippet.objects.create(**validated_data)
# 
#     def update(self, instance, validated_data):
#         instance.title = valiedated_data.get('title', instance.title)
#         instance.code = valiedated_data.get('code', instance.code)
#         instance.linenos = valiedated_data.get('linenos', instance.linenos)
#         instance.language = valiedated_data.get('language', instance.language)
#         instance.style = valiedated_data.get('style', instance.style)
#         instance.save()
#         return instance

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'linenos', 'language', 'style')
