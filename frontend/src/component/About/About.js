import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import LinkedinIcon from "@mui/icons-material/Linkedin";
import GithubIcon from "@mui/icons-material/Github";

const About = () => {
    const visitLinkedin = () => {
        window.location = "https://www.linkedin.com/in/prashant-ranawat";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://media.licdn.com/dms/image/D4D03AQEPjqEl-KlvXw/profile-displayphoto-shrink_800_800/0/1670931212635?e=1677110400&v=beta&t=rz3SrpclcJD-91ZpeBrCRG-IcHLtYgFop6o3_1N2mtg"
                            alt="Founder"
                        />
                        <Typography>Prashant Singh Ranawat</Typography>
                        <Button onClick={visitLinkedin} color="primary">
                            Visit Linkedin
                        </Button>
                        <span>
                            This is wesbite made by Prashant singh Ranawat. Only with the
                            purpose to learn MERN Stack.
                            If any doubt mail me :  <a className="mailBtn" href="mailto:pranawat2002@gmail.com">
                                <Button>pranawat2002@gmail.com</Button>
                            </a>
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Connect with Me</Typography>
                        <a
                            href="https://www.linkedin.com/in/prashant-ranawat"
                            target="blank"
                        >
                            <LinkedinIcon className="LinkedinSvgIcon" />
                        </a>

                        <a href="https://github.com/ranaji038" target="blank">
                            <GithubIcon className="githubSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;