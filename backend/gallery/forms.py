from django import forms
from django.core.exceptions import ValidationError

class AccessCodeForm(forms.Form):
    access_code = forms.CharField(
        max_length=6,
        min_length=6,
        label='Enter Your Code',
        widget=forms.TextInput(attrs={
            'id': 'access-code-input',
            'class': 'form-control text-center text-uppercase border border-dark',
            'required': True,
            'size': 6,
            'placeholder': 'abcdef',
        })
    )

    def clean_access_code(self):
        code = self.cleaned_data['access_code']
        if not code.isalnum():
            raise ValidationError('Code must be alphanumeric.')
        return code