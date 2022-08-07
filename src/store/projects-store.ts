import { Module } from "vuex";

export const projectsStore: Module<any, any> = {
    namespaced: true,
    state: {
        projects: [
            {
                reference: "cunningham-piano-services-ltd",
                title: "Cunningham Piano Services Ltd",
                introduction: "A full redesign of a local piano restoration specialist based in Yorkshire, Cunningham Piano Services Ltd.</br></br>With a greater focus on responsive design and acccessibility the proposed design resulted in a revamp of a current template based wordpress site.</br></br> Imagery is used as a focal stand point whilst implementing subtle animations to ensure users are presented with a website that echoes the high standard of the restoration.",
                images: [
                    {
                        url: "cunningham-piano-services-ltd/home",
                        altText: "Home page introduction for CPianos",
                        thumb: "/img/projects/cunningham-piano-services-ltd/home.webp",
                        src: "/img/projects/cunningham-piano-services-ltd/home.webp",
                        caption: ""
                    }
                ],
                isFeaturedProject: false,
                isHeaderProject: false,
                hasExternalLink: true,
                externalLink: "https://cpianos.co.uk",
                previewImage: {
                    url: "cunningham-piano-services-ltd",
                    altText: ""
                },
            },
            {
                reference: "in-ui-brand",
                title: "In Ui Brand",
                introduction: "Upon joining Incommunities Housing Association I took the lead in designing and implementing a fully customised shared user interface to be used across a number of internally based systems.</br></br> An internally based CDN was used to distriubute the relevant styling dependencies and as such maintainability across all systems was vastly increased. </br></br> Sub-branding was implemented through a number of SASS mixins, this provided a sense of independence towards each system whilst at the same time being a familiar interface to the end user. </br></br> The UI was subsequently branded as In Ui alongside a campaign to highlight the extensive work that had taken place in order to benefit users day to day roles.</br></br> The result of this extensive piece of work is that users now benefit from a consistent UX, responsive systems regardless of the screen size and a custom built branded interface.",
                images: [{
                    url: "inui/posters",
                    altText: "Image showing a number of branded posters for the In Ui brand.",
                    thumb: "/img/projects/inui/posters.webp",
                    src: "/img/projects/inui/posters.webp",
                    caption: "InUi branded posters used to promote the built in house shared custom user interface"
                },
                {
                    url: "inui/business-cards",
                    altText: "A number of business cards displaying the In Ui branded logo alongside call to action words.",
                    thumb: "/img/projects/inui/business-cards.webp",
                    src: "/img/projects/inui/business-cards.webp",
                    caption: "InUi cards used around the office to reiterate how InUi meets business technology goals such as Scalable and Adaptive"
                }
                ],
                isFeaturedProject: false,
                isHeaderProject: true,
                previewImage: {
                    url: "in-ui",
                    altText: "Laptop showing a system using a shared layout called In Ui."
                },
                headerProjectDetails: {
                    image: "inui-layout",
                    altText: "Responsive system layout shown on a tablet and mobile device.",
                    backgroundColor: "#cef2f4",
                    reference: "in-ui-brand"
                }
            },
            {
                reference: "incommunities-forms-builder",
                title: "Incommunities Forms Builder",
                introduction: "Whilst working at Incommunities the digital transformation from paper based forms to computer based resulted in the need for an online form submission system.</br></br> Creating an interface that met the complex requirements of the project along with whilst ensuring that users were presented with a modern UI that fit for the digital transformation.</br></br> A custom multi stage form builder with drag and drop functionality was implemented allowing business users to create forms as and when required.",
                images: [
                    {
                        url: "forms/landing-page",
                        altText: "",
                        thumb: "/img/projects/forms/landing-page.webp",
                        src: "/img/projects/forms/landing-page.webp",
                        caption: "User overview of all available forms to be filled out"
                    },
                    {
                        url: "forms/builder",
                        altText: "",
                        thumb: "/img/projects/forms/builder.webp",
                        src: "/img/projects/forms/builder.webp",
                        caption: "Admin form builder functionality enabling drag and drop interaction whilst creating employee online forms"
                    },
                    {
                        url: "forms/form",
                        altText: "",
                        thumb: "/img/projects/forms/form.webp",
                        src: "/img/projects/forms/form.webp",
                        caption: "User filling out required information in a wizard step form"
                    }
                ],
                isFeaturedProject: true,
                isHeaderProject: false,
                featuredBodyContent: "At a time where remote working transformed the work environment, the realisation that a fully customised Forms submission system was needed.</br></br>Leading on the Front-end integration and UI UX design for this complex development resulted in a responsive, built in-house web app meeting the needs of the business.",
                previewImage: {
                    url: "forms-builder",
                    altText: "Screen of the laptop depicts a view of the Forms Builder system."
                }
            },
            {
                reference: "networx-job-search",
                title: "networx Job Search",
                introduction: "Whilst working within the recruitment industry I was proud to lead the proposed redesign and frontend development of the application process, this redesign affects a number of well known clients including Argos, The Cabinet Office and United Learning. </br> </br> Click the button below to view a static markup of the design.",
                images: [
                    {
                        url: "networx/search",
                        altText: "",
                        thumb: "/img/projects/networx/search.webp",
                        src: "/img/projects/networx/search.webp",
                        caption: "Job search landing page with branded featured clients call to action links"
                    },
                    {
                        url: "networx/job",
                        altText: "",
                        thumb: "/img/projects/networx/job.webp",
                        src: "/img/projects/networx/job.webp",
                        caption: "Job advert for client Argos"
                    },
                    {
                        url: "networx/account",
                        altText: "",
                        thumb: "/img/projects/networx/account.webp",
                        src: "/img/projects/networx/account.webp",
                        caption: "Job seeker account allowing full access to view job related details such as favourited roles"
                    }
                ],
                isFeaturedProject: false,
                isHeaderProject: false,
                hasExternalLink: true,
                externalLink: "http://www.latestvacancies.com/design/2018/redesigns/candidate-experience/",
                previewImage: {
                    url: "networx",
                    altText: "Responsive website shown for networx Recruitment."
                }
            },
            {
                reference: "parcel-tracker",
                title: "Parcel Tracker",
                introduction: "Whilst working at Incommunities Housing Association I have been proud to lead the UI / UX Design and Front End Development on an internally hosted Parcel Tracking web application. </br> </br> Taking an existing outdated application I initially created a user centered modern layout offering users a number of quality of life improvements. </br> </br> This was then implemented as a VueJs SPA, SASS was used for styling and GulpJs for compiling automation. </br></br> The end result allows users to search for parcel deliveries with a range of filters, view each parcel with the ability to add notes and finally add any new deliveries through a step wizard process all the while on a fully responsive site.",
                images: [
                    {
                        url: "parcel-tracker/parcel-search",
                        altText: "",
                        thumb: "/img/projects/parcel-tracker/parcel-search.webp",
                        src: "/img/projects/parcel-tracker/parcel-search.webp",
                        caption: "Search page displaying currently delivered parcels with filters to increase usability"
                    },
                    {
                        url: "parcel-tracker/view-parcel",
                        altText: "",
                        thumb: "/img/projects/parcel-tracker/view-parcel.webp",
                        src: "/img/projects/parcel-tracker/view-parcel.webp",
                        caption: "Parcel overview with history and current delivery status"
                    },
                    {
                        url: "parcel-tracker/add-parcel",
                        altText: "",
                        thumb: "/img/projects/parcel-tracker/add-parcel.webp",
                        src: "/img/projects/parcel-tracker/add-parcel.webp",
                        caption: "Wizard allowing users to add newly delivered parcels to the tracking system"
                    }
                ],
                isFeaturedProject: false,
                isHeaderProject: true,
                previewImage: {
                    url: "parcel-tracker",
                    altText: "Parcel Tracker system displaying results of parcels delivered and tracked."
                },
                headerProjectDetails: {
                    image: "parcel-tracker",
                    altText: "Two laptops displaying screens from the Parcel Tracker system.",
                    backgroundColor: "#e6f0fe",
                    reference: "parcel-tracker"
                }
            },
            {
                reference: "pattern-library",
                title: "Pattern Library",
                introduction: "Working in conjunction with the customised Ui created for In Ui, a Pattern Library was created to act a central reference area for other members of the team. </br></br> Code snippets alongside UI component examples were made available to assit with common UI and UX patterns. Consistency was greatly improved as a result meaning once again that users we're recieving a consistent UX across systems.</br></br> Further development was integrated to implement a UX playground allowing Prototypes created in Adobe XD to be displayed to business with ease.",
                images: [
                    {
                        url: "pattern-library/landing-page",
                        altText: "",
                        thumb: "/img/projects/pattern-library/landing-page.webp",
                        src: "/img/projects/pattern-library/landing-page.webp",
                        caption: "Pattern library landing page with call to action buttons to navigate the site"
                    },
                    {
                        url: "pattern-library/iconography",
                        altText: "",
                        thumb: "/img/projects/pattern-library/iconography.webp",
                        src: "/img/projects/pattern-library/iconography.webp",
                        caption: "Iconography collection with search implementation and code snippet copy functionality built in"
                    },
                    {
                        url: "pattern-library/prototype",
                        altText: "",
                        thumb: "/img/projects/pattern-library/prototype.webp",
                        src: "/img/projects/pattern-library/prototype.webp",
                        caption: "UX Playground example showing Adobe XD Prototype embeded enabling the organisation to review with ease"
                    },
                    {
                        url: "pattern-library/about",
                        altText: "",
                        thumb: "/img/projects/pattern-library/about.webp",
                        src: "/img/projects/pattern-library/about.webp",
                        caption: "Overview of what the Incommunities Pattern Library does and the general basis of methodology it is based on"
                    }
                ],
                isFeaturedProject: false,
                isHeaderProject: true,
                previewImage: {
                    url: "pattern-library",
                    altText: "Desktop computer displaying home page for the In Ui Pattern Library."
                },
                headerProjectDetails: {
                    image: "pattern-library",
                    altText: "Laptop presenting the home screen of the Incommunities Pattern Library.",
                    backgroundColor: "#dfdefe",
                    reference: "pattern-library"
                }
            },
            {
                reference: "stovax",
                title: "Stovax Careers Microsite",
                introduction: "As part of client implementation I had the opportunity to design and take lead on the Stovax Careers site. </br></br> Industry leaders Stovax were after something that was both in keeping with the internationally recognised brand, whilst at the same time ensured that candidates were greeted with a clean modern look. Click the button below to view the live Careers Site.",
                images: [{
                    url: "stovax/landing-page",
                    altText: "",
                    thumb: "/img/projects/stovax/landing-page.webp",
                    src: "/img/projects/stovax/landing-page.webp",
                    caption: "Stovax careers landing page"
                },
                {
                    url: "stovax/meet-the-team",
                    altText: "",
                    thumb: "/img/projects/stovax/meet-the-team.webp",
                    src: "/img/projects/stovax/meet-the-team.webp",
                    caption: "Meet the team page with alternating team based information"
                },
                {
                    url: "stovax/search",
                    altText: "",
                    thumb: "/img/projects/stovax/search.webp",
                    src: "/img/projects/stovax/search.webp",
                    caption: "Current vacancies search page with available role displayed"
                }],
                isFeaturedProject: false,
                isHeaderProject: false,
                hasExternalLink: true,
                externalLink: "http://careers.stovax.com/",
                previewImage: {
                    url: "stovax",
                    altText: "Laptop on a table showing Stovax Careers Microsite."
                }
            }
        ]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        projects(state: any) {
            return state.projects;
        },
    }
}