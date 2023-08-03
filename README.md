
# Installation

```bash
# clone the repo
$ git clone https://github.com/ncatanchin/national-digital-api-test <project-name>
```

## Server Side

```bash
# go into app's directory
$ cd <project-name>/server

# install app's dependencies
$ composer install

# copy .env.example to .env
$ cp .env.example .env

# generate laravel APP_KEY
$ php artisan key:generate
```

## Usage

```bash
# start local server
$ php artisan serve
```

## Client Side


```bash

# go into app's directory
$ cd <project-name>/client

# copy .env.example to .env
$ cp .env.example .env

# install dependencies
npm install
# or
yarn install
```

then, you can run the development server:

```bash
npm run dev
# or
yarn dev
```

> **_NOTE:_** please make sure server is running.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Credits

* https://github.com/syedajmal1998/laravel-nextjs-template 

