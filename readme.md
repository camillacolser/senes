![makersacademy](https://github.com/allimac/resources/blob/master/ma_logo.png)

**week 11 / Final project**

================================

![Senes logo](https://github.com/allimac/senior-health/blob/development/mobile/www/img/logo.png)

# Senes

This is the final project for our Makers Academy coding bootcamp! The projects consists of a mobile App and an API, to allow people to provide better care for their elderly relatives.

# Table of Contents

* [Authors](#Authors)
* [The problem statement](#the-problem-statement)
* [Our solution](#our-solution)
  * [Technologies](#technologies)
  * [How to use it](#How-to-use-it)
  * [User stories implemented](#user-stories-implemented)
* [Future improvements](#future-improvements)


## Authors

[Emma Beynon](https://github.com/emmabeynon)

[Jamie Brown](https://github.com/jamiebrown201)

[Alan Gabbianelli](https://github.com/alangabbianelli)

[Camilla Colombo Serri](https://github.com/allimac)

[Katie Smith](https://github.com/klssmith)


## The problem statement

## Our solution

## Technologies
| Technologies | Testing |
|---|---|
| Rails | RSpec |
| Ruby | Karma |
| Ionic | Protractor |
| AngularJS | Jasmine |
| HTML5 | Shoulda |
| CSS |  |
| Sass |  |
## How to use it

This repository includes a folder `web` with all the codebase for the API, and a folder `mobile` with the code for the Ionic mobile app.
The API has also been deployed at [senior-health.herokuapp.com](https://senior-health.herokuapp.com).
To run the API and the mobile app locally you can download the repository, start the app in a simulator and run locally the server API that feeds data to it. You will also need a valid Fitbit account to connect the app to your device.
Follow these steps if you'd like to try it out:
```
$ git clone < this repo >
$ cd < this repo >
$ npm install -g cordova
```

## User stories implemented

```
As a relative of an elderly person
So that I can track their health
I would like to link their Fitbit device

As a relative of an elderly person
So that I can get have quick information at a glance
I would like to easily see the overall conditions of the elderly relative

As a relative of an elderly person
So that I can get more detailed information about their health on that day
I would like to see their heart rate values

As a relative of an elderly person
So that I can see if they have done any physical activity
I would like to see the amount of physical activity they have done

As a relative of an elderly person
So that I can see if they are sleeping properly
I would like to see how much they have slept

As a relative of an elderly person
So that I can monitor their health over a wider range of time
I would like to see a weekly summary of their vital stats

As a relative of an elderly person
So that I can help them to remember to take medications
I would like to be able to set reminders for their device

As a relative of an elderly person
So that I can protect my elderly relative privacy
I would like to unlink my phone to the connected account (logout)

```

## Future improvements

This project wants to be an exploration into a field, that of wearable technology for the elderly, that could have
```
As an elderly user
So that I don't have to worry about syncing my device
I would like to have a device that easily syncs data to Fitbit continuously

As a relative of an elderly person
So that I can act on a health issue
I would like to receive an alert if their vital stats are outside the normal range

As a relative of an elderly person
So that I can find them if they are lost
I would like to see what their GPS location is
```
