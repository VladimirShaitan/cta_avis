<template>
    <transition appear name="slide-top">
        <header>
            <div class="language-switcher">
                <select @change="changeLang" v-model="selected">
                    <option v-for="lang in langs" :value="lang">{{lang}}</option>
                </select>
            </div>
            <div class="branch-info">
                <div class="logo">
                    <div class="inner-logo" :style="{ backgroundImage: 'url('+branchLogo+')' }"></div>
                </div>
                <span class="name">{{branchName}}</span>
            </div>
        </header>
    </transition>
</template>

<script>
    export default {
        name: "cta_header",
        props: ['langs', 'current-lang', 'branch-name', 'branch-logo'],
        methods: {
            changeLang(e){
                this.$emit('change-lang', e.target.value);
            }
        },
        data(){
            return {
                selected: this._props.currentLang
            }
        },
    }
</script>