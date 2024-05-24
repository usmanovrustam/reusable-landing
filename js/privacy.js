var firebaseConfig = {
    apiKey: "AIzaSyCgXOGOK5tQD5VPcebOrl7QGZD4z7p9nxI",
    authDomain: "globalmove-landing.firebaseapp.com",
    projectId: "globalmove-landing",
    storageBucket: "globalmove-landing.appspot.com",
    messagingSenderId: "97621362657",
    appId: "1:97621362657:web:ebc698f0067cfd60ed34a0",
    measurementId: "G-K3DS3592NC"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

function fetchPrivacyContent() {
    const docRef = firestore.collection("privacy").doc("content");
    docRef.get().then((doc) => {
        if (doc.exists) {
            const content = doc.data().text;
            insertContent(content);
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.error("Error getting document:", error);
    });
}

function insertContent(content) {
    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(content);
    document.getElementById("privacy-content").innerHTML = htmlContent;
}

window.onload = function () {
    fetchPrivacyContent();
};
