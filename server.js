const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.set("view engine", "jade");

const i18n = require("i18n");

i18n.configure({
	locales: ["en", "de", "pl"],
	directory: __dirname + "/locales",
	defaultLocale: "pl",
	cookie: "i18n"
});

app.use(cookieParser("i18n_demo"));

app.use(
	session({
		secret: "i18n_demo",
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 60000 }
	})
);

app.use(i18n.init);

app.get("/", function(req, res) {
	// res.setLocale(req.cookies.i18n);
	res.render("main", {
		i18n: res
	});
});

app.get("/contact", function(req, res) {
	res.render("contact", {
		i18n: res
	});
});

app.get("/pl", function(req, res) {
	res.cookie("i18n", "pl");
	res.redirect("/");
});

app.get("/de", function(req, res) {
	res.cookie("i18n", "de");
	res.redirect("/");
});

app.get("/en", function(req, res) {
	res.cookie("i18n", "en");
	res.redirect("/");
});

app.listen(8000, () => {
	console.log(`Server started on port 8000`);
});
