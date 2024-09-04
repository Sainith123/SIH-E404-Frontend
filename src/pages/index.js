import {React,useEffect,useState} from "react";
import { useHistory } from "react-router-dom";

import theme from "theme";
import { Theme, Link, Icon, Text, LinkBox, Box, Section, Strong } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GlobalQuarklyPageStyles } from "global-page-styles";
import { Override } from "@quarkly/components";
import * as Components from "components";
import { GiFairyWings } from "react-icons/gi";
import { FiMenu } from "react-icons/fi";
import { auth } from '../firebase'; // Import Firebase Authentication

export default (() => {

	const history = useHistory();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(setUser); // Subscribe to auth state changes
		return () => unsubscribe(); // Cleanup on unmount
	}, []);

	const handleSignOut = () => {
		auth.signOut().then(() => {
			history.push('/loginsignup'); // Redirect to login page
		});
	};
	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"index"} />
		<Helmet>
			<title>
				Home | Website Example
			</title>
			<meta name={"description"} content={"It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something bigger. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."} />
			<meta property={"og:title"} content={"Home | Website Example"} />
			<meta property={"og:description"} content={"It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something bigger. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."} />
			<meta property={"og:image"} content={"https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/website-example-quarkly.png?v=2020-11-05T19:48:01.806Z"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/readme/cra/favicon-32x32.ico"} type={"image/x-icon"} />
		</Helmet>
		<Section sm-padding="8px 0 8px 0" quarkly-title="Header-2">
			<Override
				slot="SectionContent"
				flex-direction="column"
				justify-content="space-between"
				align-items="center"
				lg-flex-direction="row"
			/>
			<Box
				display="flex"
				padding="12px 0 18px 0"
				justify-content="center"
				align-items="flex-start"
				flex-direction="row"
				width="100%"
				sm-width="50%"
				sm-align-items="center"
				sm-flex-direction="row"
				sm-justify-content="flex-start"
				md-width="50%"
				lg-width="70%"
				md-justify-content="flex-start"
				lg-justify-content="flex-start"
			>
				<LinkBox flex-direction="row" href="/" display="flex" grid-gap="18px">
					<Icon category="gi" icon={GiFairyWings} color="#6d32ec" size="37px" />
					<Text
						margin="0"
						md-margin="0px 0 0px 0"
						text-align="left"
						font="--headline3"
						sm-margin="0px 0 0px 0"
						display="block"
					>
						Smart QR
					</Text>
				</LinkBox>
			</Box>
			<Components.QuarklycommunityKitMobileSidePanel
				menuPosition="full"
				breakpoint="lg"
				width="100%"
				sm-width="50%"
				md-width="50%"
				lg-width="30%"
				justify-content="center"
				lg-justify-content="flex-end"
			>
				<Override slot="Children" md-display="flex" />
				<Override
					slot="Content"
					padding="0px 0px 0px 0px"
					background="rgba(255, 255, 255, 0)"
					lg-background="#ffffff"
					lg-margin="0px 0px 0px 0px"
				/>
				<Override
					slot="Button Text"
					font="normal 600 16px/1.5 -apple-system, system-ui, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
					text-transform="uppercase"
					letter-spacing="1px"
					sm-font="normal 600 14px/1.5 -apple-system, system-ui, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
					sm-margin="0px 2px 0px 0px"
					lg-margin="0px 0px 0px 0px"
				/>
				<Override
					slot="Button Icon :closed"
					category="fi"
					icon={FiMenu}
					size="32px"
					padding="5px 7px 5px 7px"
					border-radius="50px"
				/>
				<Override
					slot="Button Icon"
					width="28px"
					height="28px"
					category="fi"
					icon={FiMenu}
					color="--dark"
					size="24px"
					lg-width="32px"
					lg-height="32px"
				/>
				<Override
					slot="Cross"
					lg-width="32px"
					lg-height="32px"
					size="32px"
					top="24px"
					right="24px"
				/>
				<Box
					align-items="center"
					lg-justify-content="center"
					lg-align-items="flex-start"
					justify-content="center"
					display="flex"
					lg-flex-direction="column"
					lg-margin="0px auto 0px auto"
					lg-min-width="300px"
					lg-max-width="1280px"
					lg-width="90%"
					lg-padding="24px 0px 48px 0px"
				>
					<Box
						display="none"
						lg-width="100%"
						lg-margin="0px 0px 24px 0px"
						lg-display="flex"
						lg-padding="12px 0px 12px 0px"
					>
						<LinkBox flex-direction="row" href="/index" display="flex" grid-gap="18px">
							<Icon category="gi" icon={GiFairyWings} color="#6d32ec" size="37px" />
							<Text
								margin="0"
								md-margin="0px 0 0px 0"
								text-align="left"
								font="--headline3"
								sm-margin="0px 0 0px 0"
								display="block"
							>
								Awesome Company
							</Text>
						</LinkBox>
					</Box>
					<Components.QuarklycommunityKitMenu
						display="flex"
						filterMode="exclude"
						filterPages="/index"
						grid-gap="8px"
						lg-flex-direction="column"
						lg-padding="6px 0px 6px 0px"
						lg-margin="0px 0px 24px 0px"
						align-items="center"
						flex-wrap="wrap"
						overflow-x="visible"
						overflow-y="visible"
						lg-align-items="flex-start"
					>

						<Override
							slot="link"
							color="--darkL2"
							hover-color="--primary"
							font="--lead"
							text-decoration-line="initial"
							transition="color 0.1s ease 0s"
							lg-font="--lead"
							href="/vault"
						/>
						{/* <Override
							slot="link"
							color="--darkL2"
							hover-color="--primary"
							font="--lead"
							text-decoration-line="initial"
							transition="color 0.1s ease 0s"
							lg-font="--lead"
						/> */}
						<Override slot="item-active" border-width={0} />
						<Override slot="item" padding="6px 8px 6px 8px" />
						<Override slot="link-active" cursor="default" color="--primary" />
						<Override slot="link-about" />
						<Override slot="link-team">
							About Us
						</Override>
						{user ? (
								<Override slot="link-loginsignup" onClick={handleSignOut}>
									Sign Out
								</Override>
							) : (
								<Override slot="link-loginsignup">
									<Link href="/loginsignup">Login / Sign-Up</Link>
								</Override>
							)}
					</Components.QuarklycommunityKitMenu>
				</Box>
			</Components.QuarklycommunityKitMobileSidePanel>
		</Section>
		<Section
			lg-padding="25px 0 25px 0"
			sm-padding="0px 0 25px 0"
			justify-content="center"
			padding="25px 0 75px 0"
			sm-align-items="center"
			sm-justify-content="center"
			quarkly-title="Hero"
		>
			<Override
				slot="SectionContent"
				md-margin="0px 16px 0px 16px"
				width="100%"
				background="linear-gradient(180deg,rgba(0, 0, 0, 0.75) 0%,rgba(0, 0, 0, 0.5) 100%) 0 0 no-repeat,#191C23 url(https://images.unsplash.com/photo-1561555642-29be0d2dee1f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&h=2000) center center/cover repeat scroll padding-box"
				height="620px"
				justify-content="center"
				sm-width="100%"
				min-width="auto"
				margin="0px 32px 0px 32px"
				align-items="center"
				lg-height="520px"
				md-height="420px"
				md-padding="0px 24px 0px 24px"
			/>
			<Text
				font="--headline1"
				margin="16px 0px 0px 0px"
				sm-text-align="center"
				sm-width="80%"
				lg-text-align="center"
				lg-font="--headline2"
				color="--light"
			>
				Look into the future
			</Text>
			<Text
				sm-text-align="center"
				sm-width="80%"
				opacity="0.7"
				md-text-align="center"
				font="--lead"
				color="--light"
				margin="10px 0px 35px 0px"
			>
				<Strong>
					Preview how the future looks with our Smart QR
				</Strong>
			</Text>
			<Components.QuarklycommunityKitPopup>
				<Override slot="Button Open" background="--color-lightD2" color="--dark">
					View More
				</Override>
			</Components.QuarklycommunityKitPopup>
		</Section>
		<Section
			box-sizing="border-box"
			lg-padding="50px 30px 50px 30px"
			id="mission"
			padding="90px 0px 100px 0px"
			quarkly-title="About"
			border-color="--color-lightD2"
			border-style="solid"
			border-width="1px 0px 1px 0px"
			sm-padding="24px 0 24px 0"
			background="--color-lightD1"
			justify-content="center"
		>
			<Override
				slot="SectionContent"
				md-margin="0px 16px 0px 16px"
				align-items="center"
				width="100%"
				min-width="auto"
				margin="0px 32px 0px 32px"
			/>
			<Text
				text-align="center"
				font="--base"
				opacity="0.6"
				letter-spacing="1px"
				margin="0px 0px 10px 0px"
				lg-margin="0px 0px 6px 0px"
				quarkly-title="Title"
				text-transform="uppercase"
				color="--dark"
				lg-text-align="center"
			>
				Our Mission
			</Text>
			<Text
				letter-spacing="1px"
				color="--dark"
				text-align="center"
				width="85%"
				lg-font="--lead"
				sm-font="--base"
				font="normal 500 28px/1.2 'AvenirNextCyrRegular', sans-serif"
				margin="0px 0px 0px 0px"
			>
				We aim to provide a better QR service catered to the future by integrating AR/VR and making it open to everyone.
			</Text>
		</Section>
		<Section
			md-padding="25px 0px 25px 0px"
			justify-content="center"
			padding="70px 0 70px 0"
			quarkly-title="Info"
			lg-padding="50px 0px 50px 0px"
		>
			<Override
				slot="SectionContent"
				width="100%"
				min-width="auto"
				margin="0px 32px 0px 32px"
				md-margin="0px 16px 0px 16px"
			/>
			<Box
				lg-grid-template-columns="1fr"
				display="grid"
				grid-template-columns="2fr 3fr"
				grid-gap="64px"
				xl-grid-gap="32px"
				md-grid-template-columns="1fr"
			>
				<Box
					min-width="100px"
					min-height="100px"
					display="flex"
					flex-direction="column"
					align-items="flex-start"
				>
					<Text
						font="--base"
						letter-spacing="1px"
						quarkly-title="Title"
						margin="0px 0px 10px 0px"
						color="--dark"
						opacity="0.6"
						lg-text-align="center"
						lg-margin="0px 0px 6px 0px"
						text-transform="uppercase"
					>
						Team
					</Text>
					<Text
						md-font="--headline3"
						font="--headline2"
						margin="0px 0px 28px 0px"
						color="--dark"
						lg-text-align="center"
						lg-margin="0px 0px 18px 0px"
						sm-font="--headline3"
					>
						Who We Are
					</Text>
					<Text
						lg-margin="0px 0px 18px 0px"
						sm-font="--base"
						font="--lead"
						margin="0px 0px 20px 0px"
						color="--darkL2"
						opacity="0.6"
						lg-text-align="left"
					>
						It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something bigger. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.
					</Text>
					<Link
						href="/about"
						color="--light"
						padding="8px 18px 8px 18px"
						text-align="center"
						transition="transform --transitionDuration-fast --transitionTimingFunction-easeInOut 0s"
						text-decoration-line="initial"
						font="--base"
						letter-spacing="0.5px"
						margin="9px 0px 0px 0px"
						background="--color-primary"
						hover-transform="translateY(-4px)"
					>
						Read More
					</Link>
				</Box>
				<Box
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-first.svg?v=2020-11-06T16:37:39.391Z) center center/110% no-repeat"
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
					md-order="-1"
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-first.svg?v=2020-11-06T16:37:39.391Z) center center/100% no-repeat"
					margin="0px 0px 0px 0px"
					lg-order="-1"
				/>
			</Box>
			<Box
				md-margin="44px 0px 0px 0px"
				lg-grid-template-columns="1fr"
				display="grid"
				grid-template-columns="3fr 2fr"
				grid-gap="64px"
				margin="96px 0px 0px 0px"
				xl-grid-gap="32px"
				md-grid-template-columns="1fr"
				lg-margin="64px 0px 0px 0px"
			>
				<Box
					margin="0px 0px 0px 0px"
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-second.svg?v=2020-11-06T17:14:59.136Z) center center/110% no-repeat"
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-second.svg?v=2020-11-06T17:14:59.136Z) center center/100% no-repeat"
				/>
				<Box
					display="flex"
					flex-direction="column"
					align-items="flex-start"
					min-width="100px"
					min-height="100px"
				>
					<Text
						lg-text-align="center"
						quarkly-title="Title"
						text-transform="uppercase"
						opacity="0.6"
						lg-margin="0px 0px 6px 0px"
						font="--base"
						margin="0px 0px 10px 0px"
						letter-spacing="1px"
						color="--dark"
					>
						expertise
					</Text>
					<Text
						font="--headline2"
						margin="0px 0px 28px 0px"
						color="--dark"
						lg-text-align="center"
						lg-margin="0px 0px 18px 0px"
						sm-font="--headline3"
						md-font="--headline3"
					>
						Why Choose Us
					</Text>
					<Text
						opacity="0.6"
						sm-text-align="left"
						lg-text-align="left"
						lg-margin="0px 0px 18px 0px"
						sm-font="--base"
						font="--lead"
						margin="0px 0px 20px 0px"
						color="--darkL2"
					>
						It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something bigger. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.
					</Text>
					<Link
						color="--light"
						text-align="center"
						background="--color-primary"
						transition="transform --transitionDuration-fast --transitionTimingFunction-easeInOut 0s"
						hover-transform="translateY(-4px)"
						href="/team"
						text-decoration-line="initial"
						padding="8px 18px 8px 18px"
						font="--base"
						letter-spacing="0.5px"
						margin="9px 0px 0px 0px"
					>
						Read More
					</Link>
				</Box>
			</Box>
			<Box
				md-margin="44px 0px 0px 0px"
				lg-grid-template-columns="1fr"
				display="grid"
				grid-template-columns="2fr 3fr"
				xl-grid-gap="32px"
				md-grid-template-columns="1fr"
				lg-margin="64px 0px 0px 0px"
				grid-gap="64px"
				margin="96px 0px 0px 0px"
			>
				<Box
					min-width="100px"
					min-height="100px"
					display="flex"
					flex-direction="column"
					align-items="flex-start"
				>
					<Text
						quarkly-title="Title"
						text-transform="uppercase"
						lg-text-align="center"
						margin="0px 0px 10px 0px"
						letter-spacing="1px"
						color="--dark"
						opacity="0.6"
						lg-margin="0px 0px 6px 0px"
						font="--base"
					>
						CONTACTS
					</Text>
					<Text
						font="--headline2"
						margin="0px 0px 28px 0px"
						color="--dark"
						lg-text-align="center"
						lg-margin="0px 0px 18px 0px"
						sm-text-align="left"
						sm-font="--headline3"
						md-font="--headline3"
					>
						Where We Work
					</Text>
					<Text
						font="--lead"
						margin="0px 0px 20px 0px"
						color="--darkL2"
						opacity="0.6"
						lg-text-align="left"
						lg-margin="0px 0px 18px 0px"
						sm-font="--base"
					>
						It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something bigger. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.
					</Text>
					<Link
						margin="9px 0px 0px 0px"
						hover-transform="translateY(-4px)"
						text-decoration-line="initial"
						padding="8px 18px 8px 18px"
						font="--base"
						transition="transform --transitionDuration-fast --transitionTimingFunction-easeInOut 0s"
						text-align="center"
						href="/contact"
						color="--light"
						letter-spacing="0.5px"
						background="--color-primary"
					>
						Read More
					</Link>
				</Box>
				<Box
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-third.svg?v=2020-11-06T17:15:50.700Z) center center/110% no-repeat"
					lg-order="-1"
					margin="0px 0px 0px 0px"
					padding="0px 0px 60% 0px"
					height="0px"
					md-order="-1"
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-third.svg?v=2020-11-06T17:15:50.700Z) center center/100% no-repeat"
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
				/>
			</Box>
		</Section>
		<Section
			padding="100px 0px 100px 0px"
			quarkly-title="Works"
			box-sizing="border-box"
			lg-padding="50px 30px 50px 30px"
			justify-content="center"
		>
			<Override
				slot="SectionContent"
				width="100%"
				min-width="auto"
				margin="0px 32px 0px 32px"
				md-margin="0px 0px 0px 0px"
				align-items="center"
			/>
			<Text
				color="--dark"
				text-align="center"
				text-transform="uppercase"
				lg-text-align="center"
				letter-spacing="1px"
				margin="0px 0px 10px 0px"
				opacity="0.6"
				lg-margin="0px 0px 6px 0px"
				quarkly-title="Title"
				font="--base"
			>
				Error 404
			</Text>
			<Text
				text-align="center"
				lg-text-align="center"
				md-margin="0px 0px 36px 0px"
				sm-font="--headline3"
				md-font="--headline3"
				font="--headline2"
				margin="0px 0px 48px 0px"
				color="--dark"
			>
				Our Team
			</Text>
			<Box
				lg-grid-template-columns="repeat(2, 1fr)"
				md-grid-template-columns="1fr"
				width="100%"
				display="grid"
				grid-gap="32px"
				grid-template-columns="repeat(3, 1fr)"
			>
				<Box
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-first.svg?v=2020-11-06T16:37:39.391Z) center center/100% no-repeat"
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-first.svg?v=2020-11-06T16:37:39.391Z) center center/110% no-repeat"
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
				/>
				<Box
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-second.svg?v=2020-11-06T17:14:59.136Z) center center/100% no-repeat"
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-second.svg?v=2020-11-06T17:14:59.136Z) center center/110% no-repeat"
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
				/>
				<Box
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-third.svg?v=2020-11-06T17:15:50.700Z) center center/100% no-repeat"
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-third.svg?v=2020-11-06T17:15:50.700Z) center center/110% no-repeat"
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
				/>
				<Box
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-fourth.svg?v=2020-11-06T17:17:18.847Z) center center/110% no-repeat"
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-fourth.svg?v=2020-11-06T17:17:18.847Z) center center/100% no-repeat"
					padding="0px 0px 60% 0px"
				/>
				<Box
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-fifth.svg?v=2020-11-06T17:18:24.897Z) center center/100% no-repeat"
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-fifth.svg?v=2020-11-06T17:18:24.897Z) center center/110% no-repeat"
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
				/>
				<Box
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-sixth.svg?v=2020-11-06T17:19:03.657Z) center center/100% no-repeat"
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-sixth.svg?v=2020-11-06T17:19:03.657Z) center center/110% no-repeat"
				/>
			</Box>
		</Section>
		 
	</Theme>;
});