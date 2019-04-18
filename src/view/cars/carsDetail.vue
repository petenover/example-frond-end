<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form class="form-ipt" ref="form" :model="form" label-width="140px">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="车辆牌号">
                                <el-input v-model="form.licenceNum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="车牌颜色">
                            <el-select v-model="form.color" placeholder="请选择">
                                <el-option
                                v-for="item in colorList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="goBack">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'entDetail',
        data: function () {
            return {
                form: {
                    licenceNum: '',
                    color: ''
                },
                colorList: [
                    {
                        value: 1,
                        label: '蓝色'
                    },
                    {
                        value: 2,
                        label: '黄色'
                    },
                    {
                        value: 3,
                        label: '黑色'
                    },
                    {
                        value: 4,
                        label: '白色'
                    },
                    {
                        value: 5,
                        label: '绿色'
                    },
                    {
                        value: 9,
                        label: '其他'
                    }
                ]
            }
        },
        created () {
            this.defaultSet()
        },
        methods: {
            defaultSet () {
                if (this.$route.query.id) {
                    this.$axios.get('/rebuild/car/detail', { params: {
                        id: this.$route.query.id
                    }}).then((res) => {
                        if (res) {
                            this.form = res.data
                        }
                    })
                }
            },
            onSubmit () {
                delete this.form.createdAt
                delete this.form.updatedAt
                this.$axios.post('/rebuild/car/save', this.form).then((res) => {
                    this.goBack()
                })
            }
        }
    }
</script>
<style>
    .form-box {
        width: 800px;
    }
</style>
