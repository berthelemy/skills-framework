# Skills framework

## Objective

To create a way to represent and display skills that work for both humans and agents.

## Development frameworks

- Jekyll site builder
- Bootstrap
- Bootstrap icons

## Skills representation

Each skills category contains:

- name
- description

Each skill contains:

- skill reference
- name
- description
- category

Each level descriptor contains:

- descriptor
- level number (from 1-7)
- skill reference
- associated courses
    - course reference

Each level number contains:

- level number
- title
- generic description

The levels are defined similarly to those of the SFIA framework: https://sfia-online.org/en/about-sfia/how-sfia-works

Each course contains:

- course reference
- name
- provider
- url
- description

A category can contain one or more skills. A skill can be linked to one or more levels. A level can be linked to one or more courses.

## Display

The human-readable version will use a Bootstrap website, with branding configurable from a content configuration file.

The Jekyll _config.yml file will be kept separate from the content configuration file.