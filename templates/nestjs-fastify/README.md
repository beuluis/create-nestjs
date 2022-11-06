[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">{{name}}</h3>

  <p align="center">
    {{description}}
    <br />
    <br />
    ·
    <a href="https://github.com/beuluis/{{name}}/issues">Report Bug</a>
    ·
    <a href="https://github.com/beuluis/{{name}}/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

{{description}}

Utilizes [NestJS](https://nestjs.com/)

<!-- GETTING STARTED -->

## Getting Started Develop

To get a local copy up and running follow these simple steps.

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repo

```sh
git clone https://github.com/beuluis/{{name}}.git --branch develop
```

2. Copy the template file and adapt as you like

```sh
cp docker-compose.override.template.yml docker-compose.override.yml
```

3. Start docker-compose

```sh
docker-compose up --build
```

4. Call the api with `localhost:{your port}` as base url

## Endpoint dokumentation

The endpoints are documented in swagger. You can navigate to swagger on your local instance, like `localhost:{your port}/api/v1`.
Or view them [here](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/beuluis/{{name}}/main/docs/swagger.json).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

Luis Beu - me@luisbeu.de

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/beuluis/{{name}}.svg?style=flat-square
[contributors-url]: https://github.com/beuluis/{{name}}/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/beuluis/{{name}}.svg?style=flat-square
[forks-url]: https://github.com/beuluis/{{name}}/network/members
[stars-shield]: https://img.shields.io/github/stars/beuluis/{{name}}.svg?style=flat-square
[stars-url]: https://github.com/beuluis/{{name}}/stargazers
[issues-shield]: https://img.shields.io/github/issues/beuluis/{{name}}.svg?style=flat-square
[issues-url]: https://github.com/beuluis/{{name}}/issues
[license-shield]: https://img.shields.io/github/license/beuluis/{{name}}.svg?style=flat-square
