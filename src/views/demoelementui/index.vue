<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="輸入框" prop="input1">
            <el-input
              v-model="queryParams.input1"
              placeholder="请输入輸入框"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
              >重置</el-button
            >
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['demoelementui:demoelementui:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['demoelementui:demoelementui:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['demoelementui:demoelementui:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table
          v-loading="loading"
          :data="demoelementuiList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          /><el-table-column
            label="輸入框"
            align="center"
            prop="input1"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="計數器"
            align="center"
            prop="number1"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="下拉選項1"
            align="center"
            prop="select1"
            :formatter="select1Format"
            width="100"
          >
            <template slot-scope="scope">
              {{ select1Format(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                v-permisaction="['demoelementui:demoelementui:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                >修改
              </el-button>
              <el-button
                v-permisaction="['demoelementui:demoelementui:remove']"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="50%">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="輸入框" prop="input1">
              <el-input v-model="form.input1" placeholder="輸入框" />
            </el-form-item>
            <el-form-item label="計數器" prop="number1">
              <el-input-number
                v-model="form.number1"
                :min="1"
                :max="10"
                placeholder="計數器"
              />
            </el-form-item>
            <el-form-item label="下拉選項1" prop="select1">
              <el-select v-model="form.select1" placeholder="请选择">
                <el-option
                  v-for="dict in select1Options"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="下拉多選" prop="select2">
              <el-input v-model="form.select2"></el-input>
              <!-- <el-select
                prop="select2"
                v-model="form.select2"
                multiple
                @change="select2Change"
                placeholder="請選擇"
                :loading="loading"
              >
                <el-option
                  v-for="dict in selectMultOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select> -->
            </el-form-item>
            <el-form-item label="下拉多選1" prop="select3s">
              <el-select
                v-model="form.select3s"
                clearable
                placeholder="下拉多選1"
                @change="select3sChange"
              >
                <el-option
                  v-for="dict in selectMultOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Cascader级联选择器">
              <!-- <el-input
                v-model="form.select3m"
                placeholder="Cascader级联选择器"
              /> -->

              <el-cascader
                v-model="form.select3m"
                :options="options"
                @change="handleChange"
                prop="select3m"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="Switch开关" prop="switch1">
              <el-switch
                v-model="form.switch1"
                active-color="red"
                inactive-color="green"
                active-text="按月付费"
                inactive-text="按年付费"
                active-value="M"
                inactive-value="Y"
                @change="switch1Change"
              ></el-switch>
            </el-form-item>
            <el-form-item label="DatePicker" prop="datepicker1">
              <el-date-picker
                v-model="form.datepicker1"
                type="datetime"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="timepicker1">
              <!-- <el-input v-model="form.timepicker1" placeholder="timepicker1" /> -->
              <el-time-select
                prop="timepicker1"
                v-model="form.timepicker1"
                :picker-options="{
                  format: 'HH:mm:ss',
                  start: '08:30:00',
                  step: '00:30:00',
                  end: '18:00:00'
                }"
                value-format="HH:mm:ss"
                placeholder="选择时间"
              >
              </el-time-select>
            </el-form-item>
            <el-form-item label="Upload 上传" prop="upload1">
              <!-- <el-input v-model="form.upload1" placeholder="Upload 上传" />
               -->

              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :on-change="handleUploadChange"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">上傳檔案</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="Transfer" prop="tansfer1">
              <el-input v-model="form.tansfer1" placeholder="Transfer" />
            </el-form-item>
          </el-form>

          <el-divider></el-divider>
          <h3>組件練習</h3>
          <tree></tree>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import {
  addDemoElementui,
  delDemoElementui,
  getDemoElementui,
  listDemoElementui,
  updateDemoElementui
} from "@/api/demoelementui";

import Vue from "vue";
import tree from "./components/Tree";
Vue.component("tree", tree);
export default {
  name: "Config",
  data() {
    return {
      // file  upload  url
      uploadUrl: process.env.VUE_APP_BASE_API + "/api/v1/public/uploadFile",
      //上傳FILE 清單
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      //聯集選單
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      demoelementuiList: [],
      select1Options: [],
      selectMultOptions: [], //多選來源
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        input1: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        input1: [{ required: true, message: "輸入框不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_job_group").then(response => {
      this.select1Options = response.data;
    });

    //@@ selectMultOptions 準備下拉多選DATA  from type sys_oper_type
    this.getDicts("sys_oper_type").then(response => {
      this.selectMultOptions = response.data;
      console.table("下拉多選DATA=", this.selectMultOptions);
    });
  },
  methods: {
    handleUploadChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    /** 聯集選單CLICK */
    handleChange(value) {
      this.form.select3m = value.slice(-1).pop();
      console.log("handleChange=", this.form.select3m);
    },
    /** select2Change */
    select2Change(selvalue) {
      console.log("selvalue=", selvalue.toString());
      this.form.select2 = selvalue;
    },
    /*select3sChange 下拉多選1  */
    select3sChange(value) {
      this.form.select3s = value;
      console.log("this.form.select3s =", this.form.select3s);
    },
    /*switch1Change */
    switch1Change(value) {
      console.log("this.form.switch1 =", value);
    },

    /** 查询参数列表 */
    getList() {
      this.loading = true;
      listDemoElementui(
        this.addDateRange(this.queryParams, this.dateRange)
      ).then(response => {
        this.demoelementuiList = response.data.list;
        this.total = response.data.count;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        input1: undefined,
        number1: undefined,
        select1: undefined,
        select2: undefined,
        select3s: undefined,
        select3m: undefined,
        switch1: undefined,
        datepicker1: undefined,
        timepicker1: undefined,
        upload1: undefined,
        tansfer1: undefined
      };
      this.resetForm("form");
    },
    select1Format(row) {
      return this.selectDictLabel(this.select1Options, row.select1);
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加餓了嗎UI";
      this.isEdit = false;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getDemoElementui(id).then(response => {
        console.log("enter  edit  mode");
        console.table(response.data);

        this.form = response.data;
        //this.form.select2 = this.form.select2.toString(); //@@
        this.open = true;
        this.title = "修改餓了嗎UI";
        this.isEdit = true;
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            console.log("!!!!!!!");
            console.log(this.form);

            this.form.select2 = this.form.select2.toString(); //@@
            updateDemoElementui(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addDemoElementui(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const Ids = row.id || this.ids;
      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delDemoElementui(Ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    }
  }
};
</script>
