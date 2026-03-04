[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/fridgehunter)

# NGX API Mimic

This library lets you mock data and create fake API under HTTP Interceptor inside Angular apps.
Mocking data functionality let's you generate any type of data based on schematic.
Writing schematics is super easy when you have interfaces - your IDE will give you hints what should be inside specific fields!
Mocked data can be automatically stored in the LocalStorage.
In addition, you can mock whole REST API!
This library gives you complete set to create API mocks: angular interceptor, router, controllers, endpoint decorators, guard decorators, pipes and param decorators -
lots of things that can be found in NestJS.
What's difference between this library and others?
You can mock data and API at the same time just by using @UseSchema on the Controller
which lets you create RESTfull Controllers.
Also, you can create real data services that call this mocked api endpoints and then just delete interceptor to use your real API!


This library is made for:
- small demo apps that don't require back-end yet
- recruitment tasks / homework
- portfolio apps

**Don't use it for production apps** - it's just mocking library, not fully functional back-end server. **But**, you can easily move this code to the [NestJS](https://nestjs.com/)!

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Current version (v0.0.7)

You can start using this version in your projects,
but there's not much documentation yet.
Look into the angular repository of this project for some hints on how to use it.

Example:
- src/app/test.ts - interfaces, controller with schematic, router and interceptor.
- src/app.config.ts - adding api mock interceptor to your app
- src/app.ts - basic API calls, I'm testing functionalities on these

Over next few days I'll be writing tests and documentation page.

If you have any ideas or issues, let me know in GitHub issues.

**IMPORTANT!**
Some class or interface names can be identical to Angular -
I've used naming from NestJS to make it easier to just copy-paste the code into the back-end project and create real API.
It means that you'll have to separate these mock classes from your angular component / service files to prevent duplicated names and have clean-code.
Only class that can be used directly from Angular is **HttpHeaders**.

## Installation

To install, run `npm install ngx-api-mimic`.
You don't need any extra steps after installing this library.
Just start using it!

## Documentation

Project docs will be hosted under ngx-api-mock.mateuszbilicz.pl domain.

[Link not available yet]

## TODO

- [X] Create library
- [X] Import api-mock interceptor and controller logic
- [X] Import data mock
- [X] Check api-mock for any possible upgrades
- [X] Check data mock for any possible upgrades
- [X] Improve typing in data mocks
- [X] Add descriptions to data mock types
- [X] Improve typing in router
- [X] Create api mimic router factory
- [X] Create @UsingSchema(storeName?, schematic) decorator for Controller classes
- [X] Fixes in api mock existing features
- [X] Add function decorators to api mock
- [X] Add support for response type in api mock - error, success, etc - includes modifications in interceptor
- [X] Add support for fake guards
- [X] Add support for pipes
- [X] Add router prefix for multiple routers running at the same time
- [ ] Write tests
- [ ] Write app with example usages

## License

**ISC**

For more details look into LICENSE file.

## Credits & Data Sources

Api mock is inspired by beautiful back-end framework [NestJS](https://nestjs.com/)!

### Datasets

This library uses datasets from the following projects:
- [@ruanbekker](https://gist.github.com/ruanbekker) [array-names.py](https://gist.github.com/ruanbekker/a1506f06aa1df06c5a9501cb393626ea)
- [@subodhghulaxe](https://gist.github.com/subodhghulaxe) [last_names.php](https://gist.github.com/subodhghulaxe/8148971)

A big thank you to the maintainers for such amazing and large datasets!
