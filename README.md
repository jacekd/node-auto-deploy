#Node.js auto deploy

[![build status](http://ci.jacekdominiak.com/projects/11/status.png?ref=master)](http://ci.jacekdominiak.com/projects/11?ref=master)

Application designed to run the script in the server it is running. Used to redeploy the application by the [gitlab ci](https://about.gitlab.com/gitlab-ci/) build webhook. If conditions are met, it executes the script specified as a parameter of the `POST /deploy?script=` value.

**Application has no dependencies, runs of bare node.js**

##Installation
1. Clone the repository
1. Start the `server.js` with `node` or `supervisor` or `forever`

##Configuration
Edit `config.js` file to adapt it to your deployment.

Example config file:
```json
{
    "app": {
        "PORT": 9001,
        "HOST": "localhost"
    },
    "script": {
        "PATH": '/'
    },
    "conditions": {
        "address": {
            "branch": "ref",
            "status": "build_status"
        },
        "branch": "develop",
        "status": "success"
    }
}
```

|Path|Comments|
|----|--------|
|app.PORT|port definition under which application will be started|
|app.HOST|host -//-|
|script.PATH|base full path under which deployment scripts are hosted|
|conditions.address.branch|address of the branch definition which is received from CI in a hook information|
|conditions.address.status|address of the build definition which is received from CI in a hook information|
|conditions.branch|which branch should be able to run the script|
|conditions.status|status of the build which launches the script|

##License

###The MIT License
Copyright (c) 2015, Jacek Dominiak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
