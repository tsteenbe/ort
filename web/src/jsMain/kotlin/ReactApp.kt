/*
 * Copyright (C) 2020 HERE Europe B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

package org.ossreviewtoolkit.web.js

import kotlinx.css.*

import org.ossreviewtoolkit.web.js.components.ortProjectListPage
import org.ossreviewtoolkit.web.js.components.ortProjectPage
import org.ossreviewtoolkit.web.js.components.ortProjectScanPage
import org.ossreviewtoolkit.web.js.components.scanResultListPage

import react.RBuilder
import react.RComponent
import react.RProps
import react.RState
import react.dom.*
import react.router.dom.*

import styled.*

interface IdProps : RProps {
    // Should be Int, but for some reason type conversion does not work and in JS this is still a String, even if
    // defined as Int here. Therefore use String and manually cast.
    var id: String
}

interface ScanIdProps : RProps {
    var ortProjectId: String
    var ortProjectScanId: String
}

class ReactApp : RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        browserRouter {
            header {
                styledImg(alt = "OSS Review Toolkit", src = "/static/ort.png") {
                    css {
                        width = 20.rem
                        height = LinearDimension.auto
                        marginTop = 1.rem
                        marginLeft = 1.rem
                        marginBottom = 1.rem
                        verticalAlign = VerticalAlign.middle
                    }
                }

                routeLink("/main") { +"ORT Projects" }
                routeLink("/scanResults") { +"Scan Results" }
            }

            div("content") {
                switch {
                    route("/main", exact = true) {
                        ortProjectListPage {}
                    }

                    route<ScanIdProps>("/ortProject/:ortProjectId/scan/:ortProjectScanId") { props ->
                        val ortProjectId = props.match.params.ortProjectId.toInt()
                        val ortProjectScanId = props.match.params.ortProjectScanId.toInt()

                        ortProjectScanPage {
                            this.ortProjectId = ortProjectId
                            this.ortProjectScanId = ortProjectScanId
                        }
                    }

                    route<IdProps>("/ortProject/:id") { props ->
                        val id = props.match.params.id.toInt()

                        ortProjectPage {
                            ortProjectId = id
                        }
                    }

                    route("/scanResults") {
                        scanResultListPage {}
                    }
                }
            }
        }
    }
}
