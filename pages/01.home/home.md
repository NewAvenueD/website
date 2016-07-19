---
# Page variables
title: Introducing New Avenue Dentistry
menu: Introducing
body_class_list: home
###
###
### Page content
###
###
content:
  rows:
    # row 0
    - class: hero
      background: notification.jpg
      heading:
        - Introducing
        - New Avenue Dentistry

form:
    action: /
    name: quick-contact
    fields:
        - name: name
          label: Name
          default: ''
          placeholder: Your name
          autofocus: off
          autocomplete: on
          type: text

        - name: organization
          label: Organization
          default: ''
          placeholder: Organization
          autofocus: off
          autocomplete: on
          type: text

        - name: email
          label: Email
          default: ''
          placeholder: Contact email
          type: email
          validate:
            required: true

    buttons:
        - type: submit
          value: Submit

    process:
        - email:
            from: "{{ config.plugins.email.from }}"
            to:
              - "{{ config.plugins.email.to }}"
            subject: "[Feedback] {{ form.value.name|e }}"
            body: "{% include 'forms/data.html.twig' %}"
        - save:
            fileprefix: feedback-
            dateformat: Ymd-His-u
            extension: txt
            body: "{% include 'forms/data.txt.twig' %}"
        - message: Thank you for your feedback!
---
