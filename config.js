/**
 * Application config file
 * @author: Jacek Dominiak
 * @copyright: Jacek Dominiak
 * @created: 25/01/15
 */

module.exports = {
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
};