/*
 * Copyright 2014 Digital Services (DS) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/*!
 * Initializes the OAE UI APIs. First of all, the me data will be retrieved. After that, the configuration for the current
 * tenant will be retrueved, and the localization and internationalization APIs will be initialized. Finally, the widgets declared
 * in the page source will be rendered.
 *
 * This module is intended to be referenced as a *plugin*, not a regular module. Do not depend on this directly, instead depend
 * on `oae.core`, which invokes this plugin, and also efficiently pre-loads many third-party dependencies.
 */
define(['bd.api.github', 'bd.api.lastfm', 'bd.api.travis', 'bd.api.util'],

    function(githubAPI, lastfmAPI, travisAPI, utilAPI) {

        /*!
         * Object containing all of the available OAE API modules and their functions, as well as some
         * cached data (e.g. me object) that will be passed in when a module adds `bd.api!` as a dependency.
         */
        var bd = {
            'api': {
                'github': githubAPI,
                'lastfm': lastfmAPI,
                'travis': travisAPI,
                'util': utilAPI
            },
            'data': {}
        };

        /*!
         * Initialize OAE after all of the API files have loaded. This will first of all fetch the current user's me
         * feed. Then, the localization API and the internationalization API will be initialized with the locale information
         * that has been found in the me feed. After that, the full `bd` object will be returned to the module that has required
         * `bd.api!`
         */
        var initDB = function(callback) {
            // Get the github access token
            $.ajax({
                'url': '/api/tokens',
                'type': 'GET',
                'success': function(tokens) {
                    bd.data.tokens = tokens;
                    callback(bd);
                }
            });
        };

        return {
            /*!
             * Invoked when the module has been loaded, which can trigger initialization in a chained manner.
             */
            'load': function(name, parentRequire, load, config) {
                initDB(load);
            }
        };
    }
);
