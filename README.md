# A booking form with calendar with VUE

## Getting started
```
git clone https://github.com/roszpun/vue2-booking-form.git
```
```
cd vue2-booking-form
```
```
npm install
```

### Running development environment
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test:unit
```


## Project description
The main goal of the project was to create a booking for with a date picker. The requirement was not to use any external libraries besides Vue.js. Because of that the project does not contain any external lib. All of the icons are created using HTML entities. Most likely this solution requires refactoring in order to make the code more readable. What is more, I would still like to use some external date management libary since dates topic is very broad and can be tricky. Especially when it comes to i8n. However this was a very nice task to practice pure JS and Vue.js skills.

### Files location and description
Most of interesting stuff is located in ```src/components``` directory. This folder contains all of the components for the date picker, rating and form itself. The main form component is called ```BookingForm.vue```, in the ```BookingForm``` directory you can find all of the partial components such as date picker or rating component. Some of the files can contain comments or TODOS just to let know that something could be approached in different/better way. I find out it as good practice to comment code. ```src/helpers``` contains some helper functions. Probably more of such helpers or constants could be extracted to this directory or similar directories, however I've got only 3 of them to show it as a good practice to split code which gonna be reusable across various parts of the application. 

#### Tests

Tests can be found in ```tests/unit```. The coverage is not huge, but at least the most important parts are covered. Unit testing can be very time consuming and because of that and due to the deadline I limited them to the basic ones.

#### A few words about environment

I chose to use default (suggested by vue community) vue-cli setup. Of course I could create the environment from scratch but this can be time consuming and problematic. Vue-cli provides a lot of options out of the box and allows to customize project.  The provided approach of development is strongly encouraged by Vue.js creators and as long as project does not require to create environment from scratch I will stick to vue-cli one. 

PS. I also do not like huge npm dependencies ;)
