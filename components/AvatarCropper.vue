<template>
<v-dialog v-model="show" max-width="90vw">
  <v-card>
    <vue-anka-cropper
        :options="{
            aspectRactio: 1,
            croppedHeight: 400,
            croppedWidth: 400,
            resultMimeType: 'image/png',
            dropareaMessage: 'Arraste sua imagem aqui'
        }"
        @cropper-saved="saveCrop"
    ></vue-anka-cropper>
    <v-row justify="space-between">
        <v-col>
            <v-card-actions>
              <v-btn color="primary" @click.stop="show=false">Close</v-btn>
            </v-card-actions>
        </v-col>
    </v-row>
  </v-card>
</v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import vueAnkaCropper from 'vue-anka-cropper'

export default Vue.extend({
    components: {
		vueAnkaCropper,
	},
    props: {
        value: Boolean
    },
    data (){
        const cropData = {}
        return {
            cropData
        }
    },
    computed: {
        show: {
            get () {
                // @ts-ignore
                return this.value
            },
            set (value) {
                // @ts-ignore
                this.$emit('input', value)
            }
        }
    },
    watch: {
        'cropData' (newCrop) {
            this.$emit('getCrop', newCrop)
            this.$emit('input', false)
        }
    },
    methods: {
        saveCrop (payload: any){
            this.$data.cropData = payload
        }
    }
})
</script>

<style>
    @import '../node_modules/vue-anka-cropper/dist/VueAnkaCropper.css';

.v-dialog {
    overflow: hidden;
}

.ankaCropper__navigation{
    display: flex;
    align-items: center;
}
.ankaCropper__navButton{
    display: inline-table;
}
.ankaCropper__saveButton{
    display: initial;
    height: auto;
    justify-self: end;
    margin-left: auto;
    background: var(--v-primary-base) !important;
}
</style>