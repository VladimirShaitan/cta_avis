<template>

        <main class="thanks-page">
            <transition appear name="slide-x">
                <div>
                    <img src=".././assets/img/icon.png">
                    <p class="thanks">{{lang.thx}}</p>
                    <!--Спасибо, сейчас поправим-->
                </div>
            </transition>
        </main>

</template>

<script>
    import router from '.././assets/js/router.js'
    export default {
        name: "cta_finish",
        props: ['lang'],
        components: {
            router
        }
    }
</script>