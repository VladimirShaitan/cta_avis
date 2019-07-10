<template>
    <main>
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
    </main>
</template>

<script>
    export default {
        name: "main"
    }
</script>

<style scoped>

</style>