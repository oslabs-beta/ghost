import React from 'react'
import NavBar from './NavBar'
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import { solarizedLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import BackToTop from './BackToTop';
import Footer from './Footer'
import { positions } from '@mui/system';
import { HashLink } from 'react-router-hash-link';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('bash', bash);

const code1 = `npm run server`;
const code2 = `aws configure`;
const code3 = 
`AWS Access Key ID:
AWS Secret Access Key:
Default region name [us-west-1]:
Default output format [json]:`;
const code4 =
`git clone https://github.com/oslabs-beta/ghost.git
cd ghost
npm install
`
const code5 =
`npm run server`


export default function Docs() {

  return (
    <div>
      <NavBar />
      <BackToTop />
      <div className="w-99vh min-h-screen bg-[#686868] p-6 flex flex-row text-white">
        <div className="flex-shrink-0 fixed w-[180px] mt-[70px] pl-3 pr-4 font-bold text-white" >
          <ul>
            <li className="py-1"><HashLink to="#getting-started">Getting started</HashLink></li>
            <li className="py-1"><HashLink to="#configuration">Configuration</HashLink></li>
            <li className="py-1"><HashLink to="#run-server">Run the Server</HashLink></li>
            <li className="py-1"><HashLink to="#download">Download/Launch</HashLink></li>
            <li className="py-1"><HashLink to="#metrics">Metrics</HashLink></li>
            <li className="py-1"><HashLink to="#pricing">Pricing</HashLink></li>
            <li className="py-1"><HashLink to="#permissions">Permissions</HashLink></li>
            <li className="py-1"><HashLink to="#tech">Technologies Used</HashLink></li>
            <li className="py-1"><HashLink to="#issue">Report an Issue</HashLink></li>
            <li className="py-1"><HashLink to="#contribute">Contribute</HashLink></li>
          </ul>
        </div>


        <div className="flex-shrink-1 w-[1200px] py-[70px] pl-[200px] pr-4">
          <h1 id="getting-started" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Getting Started</h1>
          <p>
            First, please log into <span className="text-[#9cb59d]">Amazon Web Services</span> (AWS). 
            Ghost works best when the AWS Command Line Interface (CLI) is installed on your computer.
          </p>
          <p>
          <a href="https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3FhashArgs%3D%2523%26isauthcode%3Dtrue%26state%3DhashArgsFromTB_us-west-2_3def78f93219f346&client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&forceMobileApp=0&code_challenge=8I-LvSUOJq5oXg_UEBENvX3DmGuddz2I9ScmMDvYY64&code_challenge_method=SHA-256">
            <button className="rounded-md border border-transparent m-2 bg-[#9cb59d] px-8 py-3 text-base font-medium text-white hover:bg-[#798f7a] md:py-4 md:px-10 md:text-lg">
              Log into AWS</button>
            </a>
            <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">
            <button className="items-center justify-center rounded-md border border-transparent bg-[#bdbdbd] px-8 py-3 text-base font-medium text-[#ffffff] hover:bg-[#a6a6a6] md:py-4 md:px-10 md:text-lg">
              Install AWS CLI</button>
            </a>
          </p>
          <br /><br />

          <h1 id="configuration" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Configuration</h1>
          <p>
            Configure the AWS CLI with your user profile in your terminal of choice.
            <SyntaxHighlighter children={ code2 } language="bash" style={ solarizedLight } />
            You will need your security credentials (Access Key ID and Secret Access Key), AWS Region,
            and output format. You can just press 'enter' if the default values match yours.
            <SyntaxHighlighter children={ code3 } language="bash" style={ solarizedLight } />
          </p> 
          <br /><br />

          {/* IF SERVER IS NOT EXTERNALLY HOSTED, include instructions to clone repo and npm run server  */}
          {/* but if it is hosted, they can just download and launch so we can delete the below selection */}
          <h1 id="run-server" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Run the Server</h1>
          <p>
            To run the server, clone the GitHub repository to your computer. Navigate to the local directory and install the required Node modules.
            <SyntaxHighlighter children={ code4 } language="bash" style={ solarizedLight } />
            Once completed, run the server.
            <SyntaxHighlighter children={ code5 } language="bash" style={ solarizedLight } />
          </p>
          <br /><br />

          <h1 id="download" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Download and Launch</h1>
          <p>
            Download ghost from the GitHub repository under 'Releases.' Currently, there are releases for MacOS and Windows.
          </p>
          <p>
          <a href="#">
            <button className="rounded-md border border-transparent m-2 bg-[#9cb59d] px-8 py-3 text-base font-medium text-white hover:bg-[#798f7a] md:py-4 md:px-10 md:text-lg">
              Mac OS</button>
            </a>
            <a href="#">
            <button className="items-center justify-center rounded-md border border-transparent bg-[#bdbdbd] px-8 py-3 text-base font-medium text-[#ffffff] hover:bg-[#a6a6a6] md:py-4 md:px-10 md:text-lg">
              Windows</button>
            </a>
          </p>
          <p>
            On <span className="text-[#9cb59d]">MacOS</span>:
              <ol className='list-decimal ml-12 mb-1'>
                <li>Open the .dmg file to place ghost into your Applications folder.</li>
                <li>Click on ghost in Applications to launch the app.</li>
              </ol>
            <br />
            On <span className="text-[#9cb59d]">Windows</span>:
              <ol className='list-decimal ml-12'>
                <li>Unzip the downloaded file</li>
                <li>Double click on ghost to launch the app.</li>
              </ol>
            <br />
            Now that ghost is ready to go, let's get started!
          </p>
          <br /><br />

          <h1 id="metrics" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Metrics</h1>
          <p>
            To view any graphs or data, you need to first select the Lambda Function you would like to view metrics for. 
            Press 'Your Lambda Functions' on the left menu, then click the 'METRICS' button under the Lambda Function.
            Here are some basic metrics of your Lambda Function. 
          </p>
          <br />
          <p>
            For customized graphs and to see more metrics, select the Lambda Function you would like to create a custom graph for and view its metrics. 
            Then click the orange 'CREATE GRAPH' button in the top right corner to display the graph creation user interface. 
            Enter a title, select a metric, graph type, date/time range (end time must be within 24 hours from the start time), 
            and then hit the 'SUBMIT' button. 
          </p>
          <br />
          <img src="https://i.postimg.cc/Dwb7TNfv/bandicam-2022-11-09-19-19-02-454.gif" />
          <br /><br />


          <h1 id="pricing" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Pricing</h1>
          <p>
            To view the pricing calculator and previous billing history, first select the Lambda Function you would 
            like to view pricing data for from the left menu. Click the 'PRICING' button under the specific Lambda Function. 
            This will bring up the pricing calculator. Select type, memory size, storage size, billed duration, and total invocations. 
            Click the 'CALCULATE PRICE' button when you are ready.        
          </p>
          <br />
          <p>
            To view past billing history, click the 'HISTORY' tab when you are in the pricing calculator user interface for 
            that specific Lambda function. Select your month and year then click 'SUBMIT'. Your previous total cost for that month 
            will be displayed.
          </p>
          <br />
          <img src="https://i.postimg.cc/L4cpVTBG/bandicam-2022-11-09-19-23-54-939.gif" />
          <br /><br />

          <h1 id="permissions" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Permissions</h1>
          <p>
            Select the Lambda Function you would like to view/edit permissions for in the left menu. 
            Under the selected Lambda Function, click the 'PERMISSIONS' button. This will show the permissions UI and 
            'LIST OF PERMISSIONS' is the default tab. Here you can view all your permissions' information. If you want to delete any, 
            simply click on the 'DELETE PERMISSION' button under the specific permission you wish to delete. 
          </p>
          <br />
          <p>
            To add permissions, click on the 'ADD NEW PERMISSIONS' tab on top. Enter a Statement ID (cannot contain spaces), select an action, 
            add a Principal, Principal Organization ID (optional), and then click 'ADD PERMISSION'. Your new permission has been 
            added and can be seen on the 'LIST OF PERMISSIONS' tab now!
          </p>
          <br />
          <img src="https://i.postimg.cc/Nj0p2h2t/bandicam-2022-11-09-19-25-57-235.gif" />
          <br /><br />

          <h1 id="tech" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Technologies Used</h1>
          <p className='ml-8'>
            <li>Electron</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>React Router</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>Chart.js</li>
            <li>MaterialUI</li>
            <li>Tailwind CSS</li>
          </p>
          <br /><br />

          <h1 id="issue" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Report an Issue</h1>
          Encountered a problem with our application? Submit a ticket to our GitHub under 'Issues.' Please be as descriptive as possible.
          <p>
            <a href="https://github.com/oslabs-beta/ghost/issues">
              <button className="rounded-md border border-transparent m-2 bg-[#9cb59d] px-8 py-3 text-base font-medium text-white hover:bg-[#798f7a] md:py-4 md:px-10 md:text-lg">
                Submit a Ticket</button>
            </a>
          </p>
          <br /><br />

          <h1 id="contribute" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Contribute</h1>
          <p>
            Interested in contributing to ghost or the Open Source community? 
            The following is a list of features that the ghost team has either started or would like to implement. 
            If you also have additional ideas, feel free to iterate off of ghost and implement those features! 
          </p>
          <p className='ml-8'>
            <li>Additional testing</li>
            <li>Alerts</li>
            <li>Search for your function</li>
            <li>Season 5 Silicon Valley</li>
          </p>
          <br />
          <p>
            To contribute:
            <ol className='list-decimal ml-12'>
              <li>Fork the repository to your GitHub account.</li>
              <li>Clone the project on your machine.</li>
              <li>Create a branch for the issue you would like to work on.</li>
              <li>Once completed, submit a pull request. A member of our team will review it as soon as we can!</li>
            </ol>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}