---
title: Contact Us
body_class_list: contact
hero: desk.jpg
menu: Contact
form:
    name: contact-us-form
    fields:
        - name: name
          label: Name
          placeholder: Enter your name
          autofocus: on
          autocomplete: on
          type: text
          validate:
            required: true

        - name: email
          label: Email
          placeholder: Enter your email address
          type: email
          validate:
            required: true

        - name: organization
          label: Organization
          default: ''
          placeholder: Organization
          autofocus: off
          autocomplete: on
          type: text

        - name: comments
          label: Additional comments
          placeholder: Additional comments
          type: textarea
          class: comments

    buttons:
        - type: submit
          value: Submit

    process:
        - email:
            from: "{{ config.plugins.email.from }}"
            to:
              - "{{ config.plugins.email.to }}"
              - "adam.romines@gmail.com"
            subject: "[Feedback] {{ form.value.name|e }}"
            body: "{% include 'forms/data.html.twig' %}"
        - save:
            fileprefix: feedback-
            dateformat: Ymd-His-u
            extension: txt
            body: "{% include 'forms/data.txt.twig' %}"
        - message: Submission successful. Thank you for getting in touch!
---

### Interested in learning more? Drop us a note

**New Avenue Dentistry**  
3007 Skyway Circle North, Suite 100
Irving, TX 75038  
972.905.1359  
