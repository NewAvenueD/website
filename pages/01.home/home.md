---
# Page variables
title: Introducing New Avenue Dentistry
menu: Introducing
body_class_list: home
heading:
- Introducing
- New Avenue Dentistry
content:
    items: @self.modular
    order:
        by: default
        dir: asc
        custom:
            - _delivered
            - _elevator
            - _how-it-works-header
            - _apt-scheduling
            - _mobile-facility
            - _notifications
            - _site-visits
            - _full-range
###
###
### Mini Contact form
###
form:
    action: /
    name: quick-contact
    fields:
        - name: comments
          label: Additional comments
          placeholder: Comments
          type: textarea
          class: comments
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
              - "{{ config.plugins.email.from }}"
            subject: "[Contact form submission] {{ form.value.name }}"
            body: "{% include 'forms/data.html.twig' %}"
        - save:
            fileprefix: feedback-
            dateformat: Ymd-His-u
            extension: txt
            body: "{% include 'forms/data.txt.twig' %}"
        - message: Submission successful. Thank you for getting in touch!
---
