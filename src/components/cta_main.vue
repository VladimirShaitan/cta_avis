<template>

            <main>
                <transition appear name="slide-x">
                <div>
                    <p class="question">{{question}}</p>
                    <p class="sub-title">{{lang.choose_text}}</p>
                    <div class="answers">
                        <form id="answers" @change="sendAnswer">
                            <label v-for="answer in answers">
                                <input type="radio" name="answerId" :value="answer.id">
                                <div>{{answer.answer}}</div>
                            </label>
                        </form>
                    </div>
                </div>
                </transition>
            </main>

</template>

<script>
    import router from '.././assets/js/router.js';
    import serialize from '.././assets/js/serialize.js';
    import axios from 'axios';

    export default {
        name: "cta_main",
        props: ['question', 'answers', 'lang'],
        components: {
            router
        },
        methods: {
            sendAnswer(e){
                console.log(serialize(e.target.form));
                axios.post('https://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/cta/scanCta?'+serialize(e.target.form)+'&ctaId='+sessionStorage.getItem('ctaId'))
                    .then((resp) => {
                        if(resp.data.success){
                            router.push({name: 'cta_finish'});
                        }
                    })
            }
        }
    }
</script>