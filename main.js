const { app, BrowserWindow } = require("electron");
const path = require("path");
const Chance = require("chance");


var win;
function createWindow(){
    win = new BrowserWindow({
        width: 1500,
        height: 800,
        // show: false,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
            preload:`${__dirname}/actionFunc.js`
          }
    });

    win.webContents.openDevTools();

    win.webContents.session.setProxy({
        // mode: fixed_servers,
        proxyRules:"localhost:8888" }
    );

    const url = "https://www.instagram.com/accounts/emailsignup/";
    loader(win, url);
}


function loader(win, url){
    var generator = new Chance(Math.random);
    win.loadURL(url);


    var name = generator.name().split(" ");
    var LastName = name[1];
    var FirstName = name[0];
    name = name.join("");

    var email = name + generator.string({length: 7, pool: "abcdertygh1234567890"})+"@outlook.com"
    var pass = generator.string({length: 10, pool: "qwertyuiopASDfghjklzxcvbnmQWERTYHJUI1234567890"});

    // console.log(name);
    // console.log(LastName);
    // console.log(FirstName);
    // console.log(name);
    // console.log(email);
    // console.log(pass);

    win.webContents.on("did-finish-load", () => {
    
        // win.webContents.send("replaceMsg", "emailOrPhone", email, 1000);
        // win.webContents.send("replaceMsg", "fullName", LastName, 2000);
        // win.webContents.send("replaceMsg", "username", LastName, 3000);
        // win.webContents.send("replaceMsg", "password", pass, 4000);
        win.webContents.send("clickObjByText", "Регистрация", 20000);
    });

}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})

app.whenReady().then(() => {
    createWindow();


    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})
