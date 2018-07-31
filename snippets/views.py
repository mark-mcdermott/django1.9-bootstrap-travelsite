# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import mixins
from rest_framework import generics


class SnippetList(generics.ListCreateAPIView):
    """
    List or create
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Get, update, or delete
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
