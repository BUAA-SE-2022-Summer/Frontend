<template>
    <div>
        <projectlevelbanner />
        <div style="display:flex">
            <div style="float:left">
                <projectMenu />
            </div>
            <div style="float: right">
                <projectAll />
            </div>
        </div>
    </div>
</template>>

<script>
import projectlevelbanner from "../../views/Projectlevelbanner";
import projectAll from "./projectAll";
import projectMenu from "./projectMenu";
export default {
    name: "projectMain",
    components: {
        projectlevelbanner,
        projectAll,
        projectMenu
    },
    data() {
        return {

        }
    }
}

</script>