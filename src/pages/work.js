import React from "react";
import theme from "theme";
import { Theme, Link, Icon, Text, LinkBox, Box, Section, Button } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GlobalQuarklyPageStyles } from "global-page-styles";
import { Override } from "@quarkly/components";
import * as Components from "components";
import { GiFairyWings } from "react-icons/gi";
import { FiMenu } from "react-icons/fi";
export default (() => {
	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"work"} />
		<Helmet>
			<title>
				Work | Website Example
			</title>
			<meta name={"description"} content={"It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something bigger. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."} />
			<meta property={"og:title"} content={"Work | Website Example"} />
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
						/>
						<Override slot="item-active" border-width={0} />
						<Override slot="item" padding="6px 8px 6px 8px" />
						<Override slot="link-active" cursor="default" color="--primary" />
						<Override slot="link-about" />
						<Override slot="link-team">
							About Us
						</Override>
						<Override slot="link-loginsignup">
							Login / Sign-Up
						</Override>
					</Components.QuarklycommunityKitMenu>
				</Box>
			</Components.QuarklycommunityKitMobileSidePanel>
		</Section>
		<Section
			border-color="--color-lightD2"
			border-style="solid"
			border-width="1px 0px 1px 0px"
			sm-padding="24px 0 24px 0"
			quarkly-title="About"
			box-sizing="border-box"
			background="--color-lightD1"
			padding="90px 0px 100px 0px"
			lg-padding="50px 0px 50px 0px"
			justify-content="center"
		>
			<Override
				slot="SectionContent"
				align-items="center"
				margin="0px 32px 0px 32px"
				width="100%"
				md-margin="0px 16px 0px 16px"
				min-width="auto"
			/>
			<Text
				color="--dark"
				lg-text-align="center"
				lg-margin="0px 0px 6px 0px"
				quarkly-title="Title"
				text-transform="uppercase"
				text-align="center"
				font="--base"
				opacity="0.6"
				letter-spacing="1px"
				margin="0px 0px 10px 0px"
			>
				OUR PROJECTS
			</Text>
			<Text
				text-align="center"
				width="85%"
				lg-font="--lead"
				sm-font="--base"
				font="--headline3"
				margin="0px 0px 0px 0px"
				letter-spacing="1px"
				color="--dark"
			>
				We’re a group of creatives who've built a business to make the world a better place.
			</Text>
		</Section>
		<Section lg-padding="60px 0 60px 0" quarkly-title="Info" justify-content="center" padding="100px 0 80px 0">
			<Override
				slot="SectionContent"
				width="100%"
				md-margin="0px 16px 0px 16px"
				min-width="auto"
				margin="0px 32px 0px 32px"
			/>
			<Box grid-gap="32px" grid-template-columns="2fr 3fr" lg-grid-template-columns="1fr" display="grid">
				<Box
					min-width="100px"
					min-height="100px"
					display="flex"
					flex-direction="column"
					align-items="flex-start"
				>
					<Text
						margin="0px 0px 10px 0px"
						color="--dark"
						opacity="0.6"
						lg-text-align="center"
						text-transform="uppercase"
						font="--base"
						letter-spacing="1px"
						lg-margin="0px 0px 6px 0px"
						quarkly-title="Title"
					>
						Web design
					</Text>
					<Text
						color="--dark"
						lg-text-align="center"
						md-margin="0px 0px 16px 0px"
						md-font="--headline3"
						font="--headline2"
						margin="0px 0px 28px 0px"
					>
						Project #1
					</Text>
					<Text
						md-font="--base"
						font="--lead"
						margin="0px 0px 20px 0px"
						color="--darkL2"
						opacity="0.6"
						lg-text-align="left"
					>
						It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something bigger. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.
					</Text>
					<Link
						margin="9px 0px 0px 0px"
						hover-transform="translateY(-4px)"
						transition="transform --transitionDuration-fast --transitionTimingFunction-easeInOut 0s"
						color="--light"
						padding="8px 18px 8px 18px"
						font="--base"
						letter-spacing="0.5px"
						text-align="center"
						href="/contact"
						text-decoration-line="initial"
						background="--color-primary"
					>
						I Want One Too!
					</Link>
				</Box>
				<Box
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
					lg-order="-1"
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-first.svg?v=2020-11-06T16:37:39.391Z) center center/100% no-repeat"
					margin="0px 0px 0px 0px"
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-first.svg?v=2020-11-06T16:37:39.391Z) center center/110% no-repeat"
				/>
			</Box>
			<Box
				display="grid"
				grid-gap="32px"
				grid-template-columns="2fr 3fr"
				margin="92px 0px 0px 0px"
				lg-grid-template-columns="1fr"
				lg-margin="56px 0px 0px 0px"
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
						font="--base"
						color="--dark"
						lg-margin="0px 0px 6px 0px"
						lg-text-align="center"
						margin="0px 0px 10px 0px"
						letter-spacing="1px"
						opacity="0.6"
						text-transform="uppercase"
					>
						Mobile app
					</Text>
					<Text
						margin="0px 0px 28px 0px"
						color="--dark"
						lg-text-align="center"
						md-margin="0px 0px 16px 0px"
						md-font="--headline3"
						font="--headline2"
					>
						Project #2
					</Text>
					<Text
						opacity="0.6"
						lg-text-align="left"
						md-font="--base"
						font="--lead"
						margin="0px 0px 20px 0px"
						color="--darkL2"
					>
						It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something bigger. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.
					</Text>
					<Link
						href="/contact"
						color="--light"
						letter-spacing="0.5px"
						margin="9px 0px 0px 0px"
						background="--color-primary"
						hover-transform="translateY(-4px)"
						transition="transform --transitionDuration-fast --transitionTimingFunction-easeInOut 0s"
						text-decoration-line="initial"
						padding="8px 18px 8px 18px"
						font="--base"
						text-align="center"
					>
						I Want One Too!
					</Link>
				</Box>
				<Box
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
					lg-order="-1"
					width="100%"
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-second.svg?v=2020-11-06T17:14:59.136Z) center center/100% no-repeat"
					margin="0px 0px 0px 0px"
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-second.svg?v=2020-11-06T17:14:59.136Z) center center/110% no-repeat"
				/>
			</Box>
			<Box
				display="grid"
				grid-gap="32px"
				grid-template-columns="2fr 3fr"
				margin="92px 0px 0px 0px"
				lg-grid-template-columns="1fr"
				lg-margin="56px 0px 0px 0px"
			>
				<Box
					min-width="100px"
					min-height="100px"
					display="flex"
					flex-direction="column"
					align-items="flex-start"
				>
					<Text
						letter-spacing="1px"
						opacity="0.6"
						quarkly-title="Title"
						lg-margin="0px 0px 6px 0px"
						text-transform="uppercase"
						font="--base"
						margin="0px 0px 10px 0px"
						color="--dark"
						lg-text-align="center"
					>
						Web app
					</Text>
					<Text
						md-font="--headline3"
						font="--headline2"
						margin="0px 0px 28px 0px"
						color="--dark"
						lg-text-align="center"
						md-margin="0px 0px 16px 0px"
					>
						Project #3
					</Text>
					<Text
						lg-text-align="left"
						md-font="--base"
						font="--lead"
						margin="0px 0px 20px 0px"
						color="--darkL2"
						opacity="0.6"
					>
						It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.
					</Text>
					<Link
						background="--color-primary"
						text-decoration-line="initial"
						text-align="center"
						padding="8px 18px 8px 18px"
						font="--base"
						letter-spacing="0.5px"
						transition="transform --transitionDuration-fast --transitionTimingFunction-easeInOut 0s"
						margin="9px 0px 0px 0px"
						hover-transform="translateY(-4px)"
						href="/contact"
						color="--light"
					>
						I Want One Too!
					</Link>
				</Box>
				<Box
					background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-third.svg?v=2020-11-06T17:15:50.700Z) center center/100% no-repeat"
					margin="0px 0px 0px 0px"
					padding="0px 0px 60% 0px"
					height="0px"
					hover-background="--color-lightD2 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-illustration-sea-third.svg?v=2020-11-06T17:15:50.700Z) center center/110% no-repeat"
					transition="background --transitionDuration-normal --transitionTimingFunction-easeInOut 0s"
					lg-order="-1"
					width="100%"
				/>
			</Box>
		</Section>
		<Section
			box-sizing="border-box"
			quarkly-title="About"
			background="--color-lightD1"
			border-style="solid"
			border-color="--color-lightD2"
			lg-padding="50px 0px 50px 0px"
			padding="80px 0px 80px 0px"
			border-width="1px 0px 1px 0px"
			justify-content="center"
		>
			<Override
				slot="SectionContent"
				align-items="center"
				width="100%"
				margin="0px 32px 0px 32px"
				md-margin="0px 16px 0px 16px"
				min-width="auto"
			/>
			<Box
				display="grid"
				grid-template-columns="1fr 2fr"
				lg-grid-template-columns="1fr"
				grid-gap="32px"
				width="100%"
			>
				<Text
					color="--darkL2"
					lg-margin="0px 0px 0px 0px"
					font="--headline3"
					margin="0px 0px 10px 0px"
					display="inline-block"
				>
					Hi! I'm a paragraph.{" "}
				</Text>
				<Text
					display="inline-block"
					opacity="0.6"
					color="--darkL2"
					lg-text-align="left"
					text-align="left"
					font="--base"
					margin="0px 0px 0px 0px"
				>
					Click here to add your own text and edit me. It’s a piece of cake. I’m a great space for you to tell a story and let your site visitors know more about you. Talk about your business and what products and services you offer.
				</Text>
			</Box>
		</Section>
		<Section
			padding="75px 0 50px 0"
			lg-padding="50px 0 25px 0"
			lg-height="auto"
			justify-content="center"
			quarkly-title="USP"
		>
			<Override
				slot="SectionContent"
				width="100%"
				margin="0px 32px 0px 32px"
				md-margin="0px 16px 0px 16px"
				min-width="auto"
			/>
			<Box
				flex-direction="column"
				lg-min-height="420px"
				sm-min-height="280px"
				min-height="480px"
				padding="36px 24px 36px 24px"
				display="flex"
				align-items="center"
				justify-content="center"
				background="linear-gradient(180deg,rgba(24, 29, 34, 0.5) 0%,transparent 100%) 0 0 no-repeat,--color-lightD1 url(https://uploads.quarkly.io/5f44d0da669357001e60ed14/images/default-website-fireworks.svg?v=2020-11-06T17:22:27.801Z) center center/cover no-repeat"
				md-min-height="360px"
			>
				<Text
					font="--headline2"
					text-align="center"
					quarkly-title="Title"
					color="--light"
					md-font="--headline3"
					margin="10px 0px 15px 0px"
				>
					Make It Work.
				</Text>
				<Text
					margin="0px 0px 28px 0px"
					font="--lead"
					opacity="0.6"
					text-align="center"
					quarkly-title="Description"
					color="--light"
					max-width="720px"
				>
					Good design adds value faster than it adds cost.
				</Text>
				<Button
					margin="10px auto 0px auto"
					width="fit-content"
					color="--darkL2"
					transition="opacity .15s ease 0s"
					z-index="5"
					active-box-shadow="none"
					background="--color-light"
					opacity="1"
					md-font="--base"
					padding="8px 36px 8px 36px"
					letter-spacing="0.5px"
					position="relative"
					hover-box-shadow="none"
					font="--lead"
					hover-opacity=".85"
					focus-box-shadow="none"
				>
					Start Now
				</Button>
			</Box>
		</Section>
		<Link
			font={"--capture"}
			font-size={"10px"}
			position={"fixed"}
			bottom={"12px"}
			right={"12px"}
			z-index={"4"}
			border-radius={"4px"}
			padding={"5px 12px 4px"}
			background-color={"--dark"}
			opacity={"0.6"}
			hover-opacity={"1"}
			color={"--light"}
			cursor={"pointer"}
			transition={"--opacityOut"}
			quarkly-title={"Badge"}
			text-decoration-line={"initial"}
			href={"https://quarkly.io/"}
			target={"_blank"}
		>
			Made on Quarkly
		</Link>
	</Theme>;
});