# Selector

Selector 用于在数组中选择一个或多个值

## Props

| 名称       | 类型                    | 描述                   | 可选值       | 默认值 | 必选 |
| ---------- | ----------------------- | ---------------------- | ------------ | ------ | ---- |
| multiple   | boolean                 | 是否多选               | true / false | false  |      |
| limit      | number                  | 多选模式下的可选上限值 |              |        |      |
| modelValue | string / number / array | 值                     |              |        |      |
| disabled   | boolean                 | 是否禁用               | true / false | false  |      |

## Events

| 名称   | 描述               | 回调参数 |
| ------ | ------------------ | -------- |
| filled | 选项达到上限时触发 |          |
