
// ************************************************
// THIS PAGE REQUIRES EXPERIMENTER INPUT
// ************************************************

// don't change these import statements
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";
import { writable } from 'svelte/store';

// ************************************************
// ************************************************
// ************************************************
// ************************************************
// USER VARIABLES (FILL STUFF IN BELOW THIS LINE)
// ************************************************
// ************************************************
// ************************************************
// ************************************************

// lab variables
export const studyLocation = 'Hanover, NH'; // location of lab running mturk study
export const labName = 'Cognitive and Affective Neuroscience Laboratory'; // name of lab running HIT experiment 
export const email = 'canlab.participate@gmail.com'; // lab email for mturk
export const studyAim = 'to study emotional responses based on certain animal-based naturalistic stimuli'; // aim of mturk study 
export const studyTasks = 'watching videos and giving ratings'; // brief summary of HIT task for consent form
export const experiment = 'imensa2'; // name of experiment (should match collection name in firebase)

// HIT variables
export const HITPay = '5.00'; // pay for HIT completion (format as X.XX with no dollar sign)
export const userGroup = 'mTurk Group'; // name of collection of participants for current HIT
export const estHITTime = '60'; // estimated time to complete HIT (in minutes)
export const totalHITTime = estHITTime * 2; // total time provided for HIT (in minutes)

// stimuli variables      
//export const ratingTypes = ['happy', 'sad', 'amused']; // array of rating types  
// export const ratingTypes = ['pleasant', 'unpleasant', 'calm', 'aroused', 'funny', 'happy', 'angry', 'sad', 'disgusted', 'afraid', 'suprised']; // array of rating types   
export const ratingTypes = ['warm and tender', ' joyful', ' inspired or uplifted', ' ashamed', ' sad', ' disgusted', ' ashamed', ' horrified', ' self-relevant', ' surprised', ' angry', ' happy']

// this configures path to proper firebase
// COPY AND PASTE YOUR FIREBASE CONFIG HERE
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJ-L1dg3Ipf9RnGr6-ITx_iUltBdcvsnE",
    authDomain: "imensa-mrater2.firebaseapp.com",
    projectId: "imensa-mrater2",
    storageBucket: "imensa-mrater2.appspot.com",
    messagingSenderId: "239865831890",
    appId: "1:239865831890:web:9b2ebdea666477b058e80b",
    measurementId: "G-6FWRY78Z5H"
  };

// ************************************************
// ************************************************
// ************************************************
// ************************************************
// STOP. DON'T CHANGE ANYTHING BELOW THIS LINE
// ************************************************
// ************************************************
// ************************************************
// ************************************************

// dev is referenced as a store elsewhere in the code, so cannot be a simple Boolean
// eslint-disable-next-line no-undef
let ID = Math.floor(Math.random() * 1000000000);
const str = ID.toString();
export const dev = DEV_MODE ? writable(true) : writable(false);

// firebase info (export for use elsewhere in app)
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const serverTime = firebase.firestore.Timestamp.now();

// Functions to parse the URL to get workerID, hitID, and assignmentID
const unescapeURL = (s) => decodeURIComponent(s.replace(/\+/g, '%20'));
export const getURLParams = () => {
    const params = {};
    let url = window.location.href;
    let m = window.location.href.match(/[\\?&]([^=]+)=([^&#]*)/g);
    
    if (m) {
        let i = 0;
        while (i < m.length) {
            const a = m[i].match(/.([^=]+)=(.*)/);
            params[unescapeURL(a[1])] = unescapeURL(a[2]);
            i += 1;
        }
    }
    if (!params.workerId && !params.assignmentId && !params.hitId) {
        // eslint-disable-next-line no-undef
        if (DEV_MODE) {
            console.log(
                'App running in dev mode so HIT submission will not work!\nTo test in the sandbox make sure to deploy the app.'
            );
            params.workerId = 'test-worker';
            params.assignmentId = 'test-assignment';
            params.hitId = 'test-hit';
            params.turkSubmitTo = 'test-submit';
        }
        params.workerId = str
        params.assignmentId = str
        params.hitId = str
        params.turkSubmitTo = str;
    }
    return params;
};

// Use those functions to get the window URL params and make them available throughout the app
export const params = getURLParams();