import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import HeadNavBar from 'src/components/HeadNavBar/HeadNavBar'

const PrivacyPolicyPage = () => {
  return (
    <>
      <MetaTags title="PrivacyPolicy" description="PrivacyPolicy page" />
      <div className="mx-[140px] border-b">
        <HeadNavBar />
      </div>

      {/* <h1>PrivacyPolicyPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/PrivacyPolicyPage/PrivacyPolicyPage.tsx</code>
      </p>
      <p>
        My default route is named <code>privacyPolicy</code>, link to me with `
        <Link to={routes.privacyPolicy()}>PrivacyPolicy</Link>`
      </p> */}
      <div className="row mt-10">
        <div className="mx-40">
          <div className="intro-content no-padding">
            <h1 className="my-2">Privacy Policy</h1>
            <p className="my-2">
              Last Updated : <strong>1st December 2022</strong>
            </p>
            <p className="my-2">
              Thank you for choosing to be part of our company i.e. Redefineerp
              by Brain Cell Technologies LLP (“company”, “we”, “us”, or “our”).
              We are committed to protecting your personal information and your
              right to privacy. If you have any questions or concerns about our
              policy, or our practices with regards to your personal
              information, please contact us at{' '}
              <strong>
                3rd Floor, 19th Main Rd, Sector-2, HSR Layout, Telangana, India
              </strong>{' '}
              or send us email to{' '}
              <a href="mailto:crminfo@redefineerp.in">crminfo@redefineerp.in</a>
            </p>
            <p className="my-2">
              When you visit our website{' '}
              <a href="http://www.redefineerp.in">www.redefineerp.in</a> or
              application at Google play store or Apple App Store and use our
              services, you trust us with your personal information. We take
              your privacy very seriously. In this privacy notice, we describe
              our privacy policy. We seek to explain to you in the clearest way
              possible what information we collect, how we use it and what
              rights you have in relation to it. We hope you take some time to
              read through it carefully, as it is important.
            </p>
            <p className="my-2">
              <strong>PRODUCT AND USAGE</strong>
            </p>
            <p>
              The mobile application or the website platform or software can be
              used in following manner.
            </p>
            <p className="my-2">
              The Product REDEFINEERP is available only in the application
              format and can be accessed through Google “play store” and Apple
              “App store”. The application requires login and the data is stored
              on the device of the user as well as our cloud storage hosted on
              Google Cloud Platform. The application also allows user to save
              notes and status in the application, with the data being stored in
              the customer device. The user can use the short messaging service
              or message through apps like WhatsApp or email for sending any
              communication with the customer. The application uses device
              storage to read media information such as Call Recordings and Call
              Logs and this information is sent to our Cloud servers.
            </p>
            <p className="my-2">
              The applicant creates a login to start using our service. The
              service is free for 10 (Ten) days and chargeable thereafter based
              on the tariff shown at the time of payment.
            </p>
            <p className="my-2">
              This privacy policy applies to all information collected through
              our website or mobile application (such as www.redefineerp.in,
              Android or IOS Application) ("Apps"), and/or any related services,
              sales, marketing or events (we refer to them collectively in this
              privacy policy as the "Sites").
            </p>
            <p className="my-2">
              Please read this privacy policy carefully as it will help you make
              informed decisions about sharing your personal information with
              us.
            </p>
            <p className="my-4 mt-6">TABLE OF CONTENTS</p>
            <ol style={{ padding: ' 40px' }}>
              <li>WHAT INFORMATION DO WE COLLECT?</li>
              <li>HOW DO WE USE YOUR INFORMATION?</li>
              <li>WILL YOUR INFORMATION BE SHARED WITH ANYONE?</li>
              <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
              <li>DO WE USE GOOGLE MAPS?</li>
              <li>IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</li>
              <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
              <li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
              <li>DO WE COLLECT INFORMATION FROM MINORS?</li>
              <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
              <li>DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
              <li>DO WE MAKE UPDATES TO THIS POLICY?</li>
              <li>IS YOUR DATA SECURE?</li>
              <li>HOW CAN YOU CONTACT US ABOUT THIS POLICY?</li>
            </ol>
            <p></p>
            <br></br>
            <div className="my-2">
              <p>
                <strong>1. WHAT INFORMATION DO WE COLLECT?</strong>
              </p>
            </div>
            <p className="my-2">Personal information you disclose to us</p>
            <p className="my-2">
              In Short: We collect personal information that you provide to us
              such as name, address, contact information, passwords and security
              data and payment information (if applicable) data.
            </p>
            <p className="my-2">
              We collect personal information that you voluntarily provide to us
              when registering at the Sites or Apps, expressing an interest in
              obtaining information about us or our products and services, when
              participating in activities on the Sites such as posting messages
              in our online forums or entering competitions, contests or
              giveaways or otherwise contacting us.
            </p>
            <p className="my-2">
              The personal information that we collect depends on the context of
              your interactions with us and the Sites, the choices you make and
              the products and features you use. The personal information we
              COLLECT can include the following:
            </p>
            <p className="my-2">
              Name and Contact Data: We collect your first and last name, email
              address, postal address, phone number, and other similar contact
              data.
            </p>
            <p className="my-2">
              Credentials: We collect passwords and similar security information
              used for authentication and account access.
            </p>
            <p className="my-2">
              As per details on{' '}
              <a href="http://www.redefineerp.in">www.redefineerp.in</a> or the
              application installed
            </p>
            <p className="my-2">
              All personal information that you provide to us must be true,
              complete and accurate, and you must notify us of any changes to
              such personal information.
            </p>
            <p className="my-2">Information automatically collected</p>
            <p className="my-2">
              In Short, Some information – such as IP address and/or browser and
              device characteristics – is collected automatically when you visit
              our websites.
            </p>
            <p className="my-2">
              We automatically collect certain information when you visit, use
              or navigate the Sites. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Site and other
              technical information. This information is primarily needed to
              maintain the security and operation of our Sites, and for our
              internal analytics and reporting purposes.
            </p>
            <p className="my-2">
              Like many businesses, we also collect information through cookies
              and similar technologies. You can find out more about this in our
              Cookie Policy
            </p>
            <p className="my-2">Information collected through our Apps</p>
            <p className="my-2">
              In Short: We may collect information regarding your geo-location,
              mobile device, and push notifications when you use our apps.
            </p>
            <p className="my-2">
              If you use our Apps, we may also collect the following
              information:
            </p>
            <p className="my-2">
              Geo-Location Information. We may request access or permission to
              and track location-based information from your mobile device,
              either continuously or while you are using our mobile application,
              to provide location-based services. If you wish to change our
              access or permissions, you may do so in your device’s settings.
            </p>
            <p className="my-2">
              Mobile Device Access. We may request access or permission to
              certain features from your mobile device, including your mobile
              device’s Bluetooth, calendar, camera, contacts, microphone,
              reminders, sensors, SMS messages, social media accounts, storage
              and other features. If you wish to change our access or
              permissions, you may do so in your device’s settings.
            </p>
            <p className="my-2">
              Mobile Device Data. We may automatically collect device
              information (such as your mobile device ID, model and
              manufacturer), operating system, version information and IP
              address.
            </p>
            <p className="my-2">
              Push Notifications. We may request to send you push notifications
              regarding your account or the mobile application. If you wish to
              opt-out from receiving these types of communications, you may turn
              them off in your device’s settings.
            </p>
            <p className="my-2">Information collected from other Sources</p>
            <p className="my-2">
              In Short: We may collect limited data from public databases,
              marketing partners, social media platforms, and other outside
              sources.
            </p>
            <p className="my-2">
              We may obtain information about you from other sources, such as
              public databases, joint marketing partners, social media platforms
              (such as Facebook), as well as from other third parties. Examples
              of the information we receive from other sources include: social
              media profile information (your name, gender, birthday, email,
              current city, state and country, user identification numbers for
              your contacts, profile picture URL and any other information that
              you choose to make public); marketing leads and search results and
              links, including paid listings (such as sponsored links).
            </p>
            <div className="my-6 mt-8">
              <p>
                <strong>2. HOW DO WE USE YOUR INFORMATION?</strong>
              </p>
            </div>
            <p className="my-2">
              In Short: We process your information for purposes based on
              legitimate business interests, the fulfilment of our contract with
              you, compliance with our legal obligations, and/or your consent.
            </p>
            <p className="my-2">
              We use personal information collected via our Sites for a variety
              of business purposes described below. We process your personal
              information for these purposes in reliance on our legitimate
              business interests, in order to enter into or perform a contract
              with you, with your consent, and/or for compliance with our legal
              obligations. We indicate the specific processing grounds we rely
              on next to each purpose listed below.
            </p>
            <p className="my-2">
              We use the information we collect or receive:
            </p>
            <p className="my-2">
              To send you marketing and promotional communications. We and/or
              our third party marketing partners may use the personal
              information you send to us for our marketing purposes, if this is
              in accordance with your marketing preferences. You can opt-out of
              our marketing emails at any time (see the "Your Privacy Rights"
              below).
            </p>
            <p className="my-2">
              To send administrative information to you: We may use your
              personal information to send you product, service and new feature
              information and/or information about changes to our terms,
              conditions, and policies.
            </p>
            <p className="my-2">
              To post testimonials. We post testimonials on our Sites that may
              contain personal information. Prior to posting a testimonial, we
              will obtain your consent to use your name and testimonial. If you
              wish to update, or delete your testimonial, please contact us at{' '}
              <a href="mailto:crminfo@redefineerp.in">crminfo@redefineerp.in</a> and
              be sure to include your name, testimonial location, and contact
              information.
            </p>
            <p className="my-2">
              Deliver targeted advertising to you: We may use your information
              to develop and display content and advertising (and work with
              third parties who do so) tailored to your interests and/or
              location and to measure its effectiveness. For more information,
              see our Cookie Policy
            </p>
            <p className="my-2">
              Request Feedback: We may use your information to request feedback
              and to contact you about your use of our Sites.
            </p>
            <p className="my-2">
              To protect our Sites: We may use your information as part of our
              efforts to keep our Sites safe and secure (for example, for fraud
              monitoring and prevention).
            </p>
            <p className="my-2">
              To enable user-to-user communications. We may use your information
              in order to enable user-to-user communications with each user's
              consent.
            </p>
            <p className="my-2">
              To enforce our terms, conditions and policies.
            </p>
            <p className="my-2">
              To respond to legal requests and prevent harm: If we receive a
              subpoena or other legal request, we may need to inspect the data
              we hold to determine how to respond.
            </p>
            <p className="my-2">
              For other Business Purposes. We may use your information for other
              Business Purposes, such as data analysis, identifying usage
              trends, determining the effectiveness of our promotional campaigns
              and to evaluate and improve our Sites, products, services,
              marketing and your experience..
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</strong>
              </p>
            </div>
            <p className="my-2">
              In Short: We only share information with your consent, to comply
              with laws, to protect your rights, or to fulfil business
              obligations. We only share and disclose your information in the
              following situations:
            </p>
            <p className="my-2">
              <strong>Compliance with Laws</strong>: We may disclose your
              information where we are legally required to do so in order to
              comply with applicable law, governmental requests, a judicial
              proceeding, court order, or legal process, such as in response to
              a court order or a subpoena (including in response to public
              authorities to meet national security or law enforcement
              requirements).
            </p>
            <p className="my-2">
              Vital Interests and Legal Rights: We may disclose your information
              where we believe it is necessary to investigate, prevent, or take
              action regarding potential violations of our policies, suspected
              fraud, situations involving potential threats to the safety of any
              person and illegal activities, or as evidence in litigation in
              which we are involved.
            </p>
            <p className="my-2">
              Vendors, Consultants and Other Third-Party Service Providers: We
              may share your data with third party vendors, service providers,
              contractors or agents who perform services for us or on our behalf
              and require access to such information to do that work. Examples
              include: payment processing, data analysis, email delivery,
              hosting services, customer service and marketing efforts. We may
              allow selected third parties to use tracking technology on the
              Sites, which will enable them to collect data about how you
              interact with the Sites over time. This information may be used
              to, among other things, analyze and track data, determine the
              popularity of certain content and better understand online
              activity. Unless described in this Policy, we do not share, sell,
              rent or trade any of your information with third parties for their
              promotional purposes.
            </p>
            <p className="my-2">
              Business Transfers: We may share or transfer your information in
              connection with, or during negotiations of, any merger, sale of
              company assets, financing, or acquisition of all or a portion of
              our business to another company.
            </p>
            <p className="my-2">
              Third-Party Advertisers: We may use third-party advertising
              companies to serve ads when you visit the Sites. These companies
              may use information about your visits to our Website(s) and other
              websites that are contained in web cookies and other tracking
              technologies in order to provide advertisements about goods and
              services of interest to you.
            </p>
            <p className="my-2">
              Affiliates: We may share your information with our affiliates, in
              which case we will require those affiliates to honour this privacy
              policy. Affiliates include our parent company and any
              subsidiaries, joint venture partners or other companies that we
              control or that are under common control with us.
            </p>
            <p className="my-2">
              Business Partners: We may share your information with our business
              partners to offer you certain products, services or promotions.
            </p>
            <p className="my-2">
              With your Consent: We may disclose your personal information for
              any other purpose with your consent.
            </p>
            <p className="my-2">
              Other Users: When you share personal information (for example, by
              posting comments, contributions or other content to the Sites) or
              otherwise interact with public areas of the Site or App, such
              personal information may be viewed by all users and may be
              publicly distributed outside the Site and our App in perpetuity.
              If you interact with other users of our Sites and register through
              a social network (such as Facebook), your contacts on the social
              network will see your name, profile photo, and descriptions of
              your activity. Similarly, other users will be able to view
              descriptions of your activity, communicate with you within our
              Sites, and view your profile.
            </p>
            <p className="my-2">
              Offer Wall. Our Apps may display a third-party hosted “offer
              wall.” Such an offer wall allows third-party advertisers to offer
              virtual currency, gifts, or other items to users in return for
              acceptance and completion of an advertisement offer. Such an offer
              wall may appear in our mobile application and be displayed to you
              based on certain data, such as your geographic area or demographic
              information. When you click on an offer wall, you will leave our
              mobile application. A unique identifier, such as your user ID,
              will be shared with the offer wall provider in order to prevent
              fraud and properly credit your account.
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>
                  4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </strong>
              </p>
            </div>
            <p className="my-2">
              In Short: We may use cookies and other tracking technologies to
              collect and store your information.
            </p>
            <p className="my-2">
              We may use cookies and similar tracking technologies (like web
              beacons and pixels) to access or store information.
            </p>
            <p className="my-2">
              Specific information about how we use such technologies and how
              you can refuse certain cookies is set out in our Cookie Policy
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>5. DO WE USE GOOGLE MAPS?</strong>
              </p>
            </div>
            <p className="my-2">
              In Short: Yes, we use Google Maps for the purpose of providing
              better service.
            </p>
            <p className="my-2">
              This website or mobile application uses Google Maps APIs. You may
              find the Google Maps APIs Terms of Service here. To better
              understand Google’s Privacy Policy, please refer to this link.
            </p>
            <p className="my-2">
              By using our Maps API Implementation, you agree to be bound by
              Google’s Terms of Service. By using our implementation of the
              Google Maps APIs, you agree to allow us to gain access to
              information about you including personally identifiable
              information (such as usernames) and non-personally identifiable
              information (such as location).
            </p>
            <p className="my-2">
              For a full list of what we use information for, please see the
              previous sections. You agree to allow us to obtain or cache your
              location. You may revoke your consent at anytime. We use
              information about location in conjunction with data from other
              data providers.
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>
                  6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
                </strong>
              </p>
            </div>
            <p className="my-2">
              In Short: We may transfer, store, and process your information in
              countries other than your own.
            </p>
            <p className="my-2">
              Our servers are as provided by our vendor Amazon Web Services
              (Google Cloud Platform) located at Mumbai, India. If you are
              accessing our Sites from outside of INDIA , please be aware that
              your information may be transferred to, stored, and processed by
              us in our facilities and by those third parties with whom we may
              share your personal information (see "Disclosure of Your
              Information" above), in India and other countries .
            </p>
            <p className="my-2">
              If you are a resident in the European Economic Area, then these
              countries may not have data protection or other laws as
              comprehensive as those in your country. We will however take all
              necessary measures to protect your personal information in
              accordance with this privacy policy and applicable law.
            </p>
            <p className="my-2">
              European Commission's Standard Contractual Clauses Such measures
              implementing the European Commission's Standard Contractual
              Clauses for transfers of personal information between our group
              companies and between us and our third-party providers, which
              require all such recipients to protect personal information that
              they process from the EEA in accordance with European data
              protection laws. We have implemented similar appropriate
              safeguards with our third party service providers and partners and
              further details can be provided upon request.
            </p>
            <p className="my-2">
              In particular Brain Cell Technologies LLP complies with the
              EU-U.S. Privacy Shield Framework as set forth by the U.S.
              Department of Commerce regarding the collection, use, and
              retention of personal information transferred from the European
              Union to the United States and has certified its compliance with
              it. As such, BRAIN CELL TECHNOLOGIES LLP is committed to
              subjecting all personal information received from European Union
              (EU) member countries, in reliance on the Privacy Shield
              Framework, to the Framework’s applicable Principles. To learn more
              about the Privacy Shield Framework, visit the U.S. Department of
              Commerce’s Privacy Shield List.
            </p>
            <p className="my-2">
              BRAIN CELL TECHNOLOGIES LLP is responsible for the processing of
              personal information it receives, under the Privacy Shield
              Framework, and subsequently transfers to a third party acting as
              an agent on its behalf.
            </p>
            <p className="my-2">
              With respect to personal information received or transferred
              pursuant to the Privacy Shield Framework, Rutakshi Technologies
              Pvt Ltd is subject to the regulatory enforcement powers of the
              U.S. FTC. In certain situations, we may be required to disclose
              personal information in response to lawful requests by public
              authorities, including to meet national security or law
              enforcement requirements.
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>7. HOW LONG DO WE KEEP YOUR INFORMATION?</strong>
              </p>
            </div>
            <p className="my-2">
              In Short: We keep your information for as long as necessary to
              fulfil the purposes outlined in this privacy policy unless
              otherwise required by law.
            </p>
            <p className="my-2">
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy policy, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting or other legal requirements). No purpose in this
              policy will require us keeping your personal information for
              longer than 1 year past the termination of your account
            </p>
            <p className="my-2">
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymize it, or,
              if this is not possible (for example, because your personal
              information has been stored in backup archives), then we will
              securely store your personal information and isolate it from any
              further processing until deletion is possible.
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>8. HOW DO WE KEEP YOUR INFORMATION SAFE?</strong>
              </p>
            </div>
            <p className="my-2">
              In Short: We aim to protect your personal information through a
              system of organizational and technical security measures. We have
              implemented appropriate technical and organizational security
              measures designed to protect the security of any personal
              information we process. However, please also remember that we
              cannot guarantee that the internet itself is 100% secure. Although
              we will do our best to protect your personal information,
              transmission of personal information to and from our Sites is at
              your own risk. You should only access the services within a secure
              environment.
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>9. DO WE COLLECT INFORMATION FROM MINORS?</strong>
              </p>
            </div>
            <p className="my-2">
              In Short: We do not knowingly collect data from or market to
              children under 18 years of age. We do not knowingly solicit data
              from or market to children under 18 years of age. By using the
              Sites, you represent that you are at least 18 or that you are the
              parent or guardian of such a minor and consent to such minor
              dependent’s use of the Site and App. If we learn that personal
              information from users less than 18 years of age has been
              collected, we will deactivate the account and take reasonable
              measures to promptly delete such data from our records. If you
              become aware of any data we have collected from children under age
              18, please contact us at{' '}
              <a href="mailto:crminfo@redefineerp.in">crminfo@redefineerp.in</a>
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>10. WHAT ARE YOUR PRIVACY RIGHTS?</strong>
              </p>
            </div>
            <p className="my-2">
              In Short: In some regions, such as the European Economic Area, you
              have rights that allow you greater access to and control over your
              personal information. You may review, change, or terminate your
              account at any time.
            </p>
            <p className="my-2">
              In some regions (like the European Economic Area), you have
              certain rights under applicable data protection laws. These may
              include the right (i) to request access and obtain a copy of your
              personal information, (ii) to request rectification or erasure;
              (iii) to restrict the processing of your personal information; and
              (iv) if applicable, to data portability. In certain circumstances,
              you may also have the right to object to the processing of your
              personal information. To make such a request, please use the
              contact details provided in this policy. We will consider and act
              upon any request in accordance with applicable data protection
              laws. If we are relying on your consent to process your personal
              information, you have the right to withdraw your consent at any
              time.
            </p>
            <p className="my-2">
              Please note however that this will not affect the lawfulness of
              the processing before its withdrawal.
            </p>
            <p className="my-2">
              If you are resident in the European Economic Area and you believe
              we are unlawfully processing your personal information, you also
              have the right to complain to your local data protection
              supervisory authority. You can find their contact details here:
              https://ec.europa.eu/info/law/law-topic/data-protection_en
            </p>
            <p className="my-2">Account Information</p>
            <p className="my-2">
              You may at any time review or change the information in your
              account by:
            </p>
            <p className="my-2">
              Logging into your account settings and updating your account
            </p>
            <p className="my-2">
              Contacting us using the contact information provided below
            </p>
            <p className="my-2">
              Upon your request to terminate your account, we will deactivate or
              delete your account and information from our active databases.
              However, some information may be retained in our files to prevent
              fraud, troubleshoot problems, assist with any investigations,
              enforce our Terms of Use and/or comply with legal requirements.
            </p>
            <p className="my-2">
              Cookies and similar technologies: Most Web browsers are set to
              accept cookies by default. If you prefer, you can usually choose
              to set your browser to remove cookies and to reject cookies. If
              you choose to remove cookies or reject cookies, this could affect
              certain features or services of our Sites.
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>
                  11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS
                </strong>
              </p>
            </div>
            <p className="my-2">
              In Short:Yes, if you are a resident of California, you are granted
              specific rights regarding access to your personal information.
            </p>
            <p className="my-2">
              California Civil Code Section 1798.83, also known as the “Shine
              The Light” law, permits our users who are California residents to
              request and obtain from us, once a year and free of charge,
              information about categories of personal information (if any) we
              disclosed to third parties for direct marketing purposes and the
              names and addresses of all third parties with which we shared
              personal information in the immediately preceding calendar year.
              If you are a California resident and would like to make such a
              request, please submit your request in writing to us using the
              contact information provided below.
            </p>
            <p className="my-2">
              If you are under 18 years of age, reside in California, and have a
              registered account with the Sites/ Mobile Application, you have
              the right to request removal of unwanted data that you publicly
              post on the Sites/ Mobile Application. To request removal of such
              data, please contact us using the contact information provided
              below, and include the email address associated with your account
              and a statement that you reside in California. We will make sure
              the data is not publicly displayed on the Sites/ Mobile
              Application, but please be aware that the data may not be
              completely or comprehensively removed from our systems.
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>12. DO WE MAKE UPDATES TO THIS POLICY</strong>
              </p>
            </div>
            <p className="my-2">
              In Short: Yes, we will update this policy as necessary to stay
              compliant with relevant laws.
            </p>
            <p className="my-2">
              We may update this privacy policy from time to time. The updated
              version will be indicated by an updated “Revised” date and the
              updated version will be effective as soon as it is accessible. If
              we make material changes to this privacy policy, we may notify you
              either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this privacy policy frequently to be informed of how we are
              protecting your information.
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>13. IS YOUR DATA SECURE</strong>
              </p>
            </div>
            <p className="my-2">
              We agree to abide by and maintain adequate data security measures,
              consistent with industry standards and technology best practices,
              to protect your Data from unauthorized disclosure or acquisition
              by an unauthorized person and is protected by HTTPS SSL and
              Firewall.
            </p>
            <p className="my-2">
              We intend to appraise that the currently application is running on
              Netlify instances. Your data is stored in Cloud Firestore also on
              supabase. There is an added layer of data security through this
              vendor in addition to our own data security layer.
            </p>
            <div>
              <p className="my-6 mt-8">
                <strong>14. HOW CAN YOU CONTACT US ABOUT THIS POLICY</strong>
              </p>
            </div>
            <p className="my-2">
              If you have questions or comments about this policy, email us
              BRAIN CELL TECHNOLOGIES LLP at{' '}
              <a href="mailto:crminfo@redefineerp.in">crminfo@redefineerp.in</a> or by
              post to:
            </p>
            <p className="my-2">BRAIN CELL TECHNOLOGIES LLP</p>
            <p className="my-2">Nithesh Reddy B</p>
            <p className="my-2">
              <strong>
                3rd Floor, 19th Main Rd, Sector-2, HSR Layout, Bengaluru,
                Karnataka, India - 560102
              </strong>
            </p>
            <p className="my-2">
              If you are a resident in the European Economic Area, the "data
              controller" of your personal information is RUTAKSHI TECHNOLOGIES
              PVT LTD. BRAIN CELL TECHNOLOGIES LLP , has appointed{' '}
              <strong>Nithesh Reddy B</strong> to be its representative in the
              EEA. You can contact them directly regarding the processing of
              your information by COMPANY, by email at &nbsp;
              <a href="mailto:crminfo@redefineerp.in">crminfo@redefineerp.in</a> or by
              post to:
            </p>
            <p className="my-2">BRAIN CELL TECHNOLOGIES LLP</p>
            <p className="my-2">Nithesh Reddy B</p>
            <p className="my-2">
              <strong>
                3rd Floor, 19th Main Rd, Sector-2, HSR Layout, Bengaluru,
                Karnataka, India - 560102
              </strong>
            </p>
            <p className="my-2">
              If you have any further questions or comments about us or our
              policies, email us at{' '}
              <a href="mailto:crminfo@redefineerp.in">crminfo@redefineerp.in</a> or by
              post to:
            </p>
            <p className="my-2">BRAIN CELL TECHNOLOGIES LLP</p>
            <p className="my-2">Nithesh Reddy B</p>
            <p className="my-2">
              <strong>
                3rd Floor, 19th Main Rd, Sector-2, HSR Layout, Bengaluru,
                Karnataka, India - 560102
              </strong>
            </p>
          </div>
          <p style={{ marginTop: '5em' }}>
            2022 © Brain Cell Technologies LLP. All Rights Reserved
          </p>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicyPage
