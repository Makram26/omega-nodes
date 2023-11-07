var express = require("express");
var bodyParser = require("body-parser");
const start = require("./dbConnect");
const { default: axios } = require("axios");
const { faker } = require("@faker-js/faker");
const app = express();

start();

const NodeDetails = require("./models/userModel");
const cors = require("cors");
const dns = require("godaddy-dns");
const GoDaddy = require("godaddy-api");
const json = require("body-parser/lib/types/json");
const schedule = require('node-schedule')
godaddy = GoDaddy(
  "dL3cwpxkRp5c_9rkidwrB4aDh11TzxLGSo",
  "C4zbb62t8ADZDyBY8tZp3x"
);

app.use(cors());
app.use(bodyParser.json());

// User Routes
app.use("/api/users", require("./routes/UsersRoute"));
app.use("/api/packages", require("./routes/PackagesRoute"));
app.use("/api/links", require("./routes/LinksRoute"));

app.get("/", (req, res) => {
  res.send({ msg: "test succesful" });
});

const asia = [
  "Afghanistan",
  "Armenia",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Bhutan",
  "British Indian Ocean Territory (UK territory)",
  "Brunei",
  "Cambodia",
  "China",
  "Cyprus",
  "Egypt",
  "Georgia",
  "Hong Kong",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Israel",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Lebanon",
  "Macau",
  "Malaysia",
  "Maldives",
  "Mongolia",
  "Myanmar",
  "Nepal",
  "North Korea",
  "Oman",
  "Pakistan",
  "Palestine",
  "Philippines",
  "Qatar",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Korea",
  "Sri Lanka",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Thailand",
  "Timor-Leste/East Timor",
  "Turkey",
  "Turkmenistan",
  "United Arab Emirates",
  "Uzbekistan",
  "Vietnam",
  "Yemen",
  "Australia",
  "Fiji",
  "Kiribati",
  "Marshall Islands",
  "Micronesia",
  "Nauru",
  "New Zealand",
  "Palau",
  "Papua New Guinea",
  "Samoa",
  "Solomon Islands",
  "Tonga",
  "Tuvalu",
  "Vanuatu",
];

const europe = [
  "Albania",
  "Andorra",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Italy",
  "Kazakhstan",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "North Macedonia",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Ukraine",
  "United Kingdom",
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Democratic Republic of the Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Ethiopia",
  "Gabon",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
];
const london = ["England", "Netherlands", "Ireland"];
const server_paths = ["154.53.49.46", "194.163.130.103"];
//     {
//     'server': 'virginia',
//     'ip':
//     },
//     {'frankfurt' : ,
//     'singapore' :
//     'silicon' :
// }]

const west_coast = [
  "Alaska",
  "Arizona",
  "California",
  "Hawaii",
  "Idaho",
  "Montana",
  "Nevada",
  "New Mexico",
  "Oregon",
  "Utah",
  "Washington",
  "Wyoming",
];

const east_coast = [
  "Alabama",
  "American Samoa",
  "Arkansas",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District Of Columbia",
  "Federated States Of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Nebraska",
  "New Hampshire",
  "New Jersey",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Vermont",
  "Virgin Islands",
  "Virginia",
  "West Virginia",
  "Wisconsin",
];

// const ipBlackList = async (userIp, serverIp ) =>{
//     console.log(userIp, serverIp);
//     return await axios.post(`http://${serverIp}:4000/blackListIp`, {ip:userIp})
// }

const ipWhitelList = async (userIp, serverIp) => {
  return await axios.post(`http://${serverIp}:4000/whiteListIp`, {
    ip: userIp,
  });
};

const updateGodday = async (serverIp, link) => {
  var res = await dns
    .updateRecords(serverIp, {
      apiKey: "dL3cwpxkRp5c_9rkidwrB4aDh11TzxLGSo",
      secret: "C4zbb62t8ADZDyBY8tZp3x",
      domain: "omeganodes.com",
      records: [
        {
          type: "A",
          name: link,
          ttl: 600,
        },
      ],
    })
    .then((res) => {
      return 200;
    })
    .catch((err) => {
      if (err && err.message !== "Nothing to update") {
        return 101;
      }
      return 100;
    });
  return res;
};

const deleteGoddaySubdomain = async (serverIp, link) => {
  var res = await dns
    .updateRecords(serverIp, {
      apiKey: "dL3cwpxkRp5c_9rkidwrB4aDh11TzxLGSo",
      secret: "C4zbb62t8ADZDyBY8tZp3x",
      domain: "omeganodes.com",
      records: [
        {
          type: "A",
          name: link,
          ttl: 600,
        },
      ],
    })
    .then((res) => {
      return 200;
    })
    .catch((err) => {
      console.log({ msg: err });
      if (err && err.message !== "Nothing to update") {
        return 101;
      }
      return 100;
    });
  return res;
};

app.post("/ninja/remove", async (req, res) => {
  try {
    console.log({ recievedReq: req.body });

    var jsonRes = {};
    const { id } = req.body;

    if (id == undefined) {
      // return res.json('IP Undefined')
      return res.status(500).json({ Info: "ID Undefined" });
    }
    console.log("before");
    const userExists = await NodeDetails.findOne({ _id: id });
    console.log("after");

    if (!userExists) {
      // return res.json('IP Does Not Exist')
      return res.status(500).json({ Info: "Record Does Not Exist" });
    }
    var valstoupdate = { $set: { active: false }, new: true };
    db_record = await NodeDetails.findByIdAndUpdate(userExists.id, valstoupdate);
    console.log('Record updated', db_record);

    // link_to_remove = userExists.link;

    // API URL for delete
    await axios
      .delete(
        `https://api.godaddy.com/v1/domains/omeganodes.com/records/A/${userExists.link}`,
        {
          headers: {
            // Authorization: `sso-key dL3cwpxkRp5c_L7L4KgWhTQJLaZCvXupAdh:4YGQ7BErpqa464UbnyfwSV`
            Authorization: `sso-key dL3cwpxkRp5c_9rkidwrB4aDh11TzxLGSo:C4zbb62t8ADZDyBY8tZp3x`,
          },
        }
      )
      .then((response) => {
        console.log(`Status: ${response.status}`);
        console.log("Message: Link deleted successfully");
      })
      .catch((err) => {
        console.error(err.data);
      });
      //API URL Ends Here

    // console.log({link_to_remove: link_to_remove})
    // console.log({ip: ip})
    // console.log({server: server})
    // console.log({userExists: userExists})
    // console.log({user_server: userExists.location})
    // var response = await ipBlackList(ip, userExists.location);

    //API BLACKLIST STARTS HERE
    var response = await axios.post(
      `http://${userExists.location}:4000/blackListIp`,
      { ip: ip }
    );
    console.log({ ipBlackList: response });
    if (response.status == 200) {
      jsonRes.msg = "Ip removed successfuly";
      // return res.send({msg: jsonRes})
    } else {
      return res.status(404).json({ msg: "Failed" });
    }
    //API BLACKLIST ENDS HERE

    // jsonRes.goDaddyStatus = await axios.delete(`https://api.godaddy.com/v1/domains/traqe.com/records/A/${link_to_remove}`, {
    // headers: {
    //   Authorization: `sso-key dL3cwpxkRp5c_L7L4KgWhTQJLaZCvXupAdh:4YGQ7BErpqa464UbnyfwSV`
    // }
    //   });
    // console.log({goDaddyStatus: jsonRes.goDaddyStatus})

    return res.send({ status: 200, msg: jsonRes });
  } catch (err) {
    return res.send({ status: 500, err: err });
  }
});

app.post("/ninjaForm", async (req, res) => {
  try {
    var server = "";
    console.log({ recievedReq: req.body });
    obj = {
      ip: req.body.ip,
    };
    const { ip, states, wallet } = req.body;
    console.log({ state: states });

    if (states === "Virginia") {
      server = "154.53.49.46";
    } else if (states === "Frankfurt") {
      server = "194.163.130.103";
    } else {
      return false;
    }
    console.log('Server', server)

    // const link = "xenodes-" + faker.random.locale() + "-" + faker.datatype.uuid()
    const link = "omega-" + faker.name.firstName() + faker.word.adjective();

    var jsonRes = {
      stauts: 100,
      msg: "Provided node does not exist in cluster",
    };
    console.log('Server Path', server_paths.includes(server));
    if (server_paths.includes(server)) {
      jsonRes.link = link;
      var response = await ipWhitelList(req.body.ip, server);
      console.log({ whitelist: response.data });
      if (response.status == 200) {
        console.log({ whitelist: "in the if before" });
        jsonRes.msg = "Ip whitelisted successfuly";
      } else {
        return (jsonRes.msg = response.stdout);
      }
      jsonRes.status = res.status;
      console.log({ status: jsonRes.status, msg: jsonRes.msg });
      jsonRes.goDaddyStatus = await updateGodday(server, link);
      console.log({ goDaddyStatus: jsonRes.goDaddyStatus });

      const userExists = await NodeDetails.findOne({ ip, active:true });
      console.log("userExists", userExists);
      try {
        if (!userExists) {
          const user = await NodeDetails.create({
            ip: ip,
            wallet: wallet,
            link: link,
            location: server,
            active: true
          });
          
          if (user) {
            jsonRes.userCreated = user;
            console.log("user not exists and created");
          } else {
            return (jsonRes.userCreated = "Unable to Create user");
          }
        } else {
          return res.json("User already exists");
        }
      } catch (err) {
        return res.send({ status: 500, err: err });
      }

      return res.send({ msg: jsonRes });
    } else {
      return res.send(jsonRes);
    }
  } catch (err) {
    return res.send({ status: 500, err: err });
  }
});

const port = 5000;
// connect();
app.listen(port, () => {
  console.log("Server listening at " + port);
});
