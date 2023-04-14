import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from "@mui/icons-material/GitHub";

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
                            src="https://drive.google.com/file/d/1lJyRIkvaa6njrBgpY_IiMiXu8z-k-oZ9/view?usp=share_link"
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
                            <LinkedInIcon className="LinkedinSvgIcon" />
                        </a>

                        <a href="https://github.com/ranaji038" target="blank">
                            <GitHubIcon className="githubSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;