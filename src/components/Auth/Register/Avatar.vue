<template>
  <div id="register-avatar">
    <table>
      <tr>
        <td rowspan="3">
          <h3>双击来从移动模式和裁剪模式切换</h3>
          <div class="cropper-container">
            <img id="image" src="@/assets/default_avatar.jpeg" />
          </div>
        </td>
        <td>
          <el-upload
            class="upload-avatar"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :multiple="false"
          >
            <el-button type="primary">上传图片</el-button>
          </el-upload>
        </td>
        <td>
          <el-button type="primary" @click="crop">剪裁！</el-button>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <h3>头像预览</h3>
          <div class="img-preview-container">
            <span>256*256</span>
            <div class="img-preview circle-lg"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="img-preview-container">
            <span>128*128</span>
            <div class="img-preview circle-md"></div>
          </div>
        </td>
        <td>
          <div class="img-preview-container">
            <span>64*64</span>
            <div class="img-preview circle-sm"></div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Cropper from "cropperjs";

// Get a rounded canvas with size*size
function getRoundedCanvas(source, size) {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;
  context.imageSmoothingEnabled = true;
  context.drawImage(source, 0, 0, size, size);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, true);
  context.fill();
  return canvas;
}

function readBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = callback;
  reader.readAsDataURL(file);
  return true;
}

export default {
  name: "RegisterAvatar",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    create() {
      const img = document.getElementById("image");
      this.cropper = new Cropper(img, {
        aspectRatio: 1,
        viewMode: 1,
        preview: ".img-preview"
      });
      console.log(this.cropper);
    },
    crop() {
      const canvas = this.cropper.getCroppedCanvas();
      // substitute, the user may change it later
      this.user.img_files = Object.assign(
        {},
        {
          large: getRoundedCanvas(canvas, 256).toDataURL(),
          medium: getRoundedCanvas(canvas, 128).toDataURL(),
          small: getRoundedCanvas(canvas, 64).toDataURL()
        }
      );

      this.$set(this.user.stage, 1, true);
      this.$message({ message: "剪裁成功！", type: "success" });
      this.$emit("croppered");
    },
    beforeAvatarUpload(file) {
      const acceptable_files = ["image/jpeg", "image/png", "image/png"];
      const is_acceptable = acceptable_files.indexOf(file.type) !== -1;
      const is_lt_2M = file.size / 1024 / 1024 < 2;

      if (!is_acceptable) {
        this.$message.error("图片只能为 jpg，png 或者 bmp 格式！");
        return false;
      }
      if (!is_lt_2M) {
        this.$message.error("上传的图片大小不能超过 2M!");
        return false;
      }

      // Here is logically success, but we need to cancel the upload process
      // So we return false
      readBase64(file, e => {
        this.cropper.replace(e.target.result);
        this.cropper.reset();
      });

      return false;
    }
  },
  mounted: function() {
    this.create();
  }
};
</script>

<style scoped>
@import "~cropperjs/dist/cropper.min.css";

#register-avatar {
  display: table;
  margin: 0 auto;
}

.cropper-container {
  width: 600px;
  height: 600px;
}

#image {
  max-width: 100%;
}

.circle-lg {
  width: 256px;
  height: 256px;
  border-radius: 50%;
  overflow: hidden;
}

.circle-md {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
}

.circle-sm {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
}

.cropper-container >>> .cropper-view-box,
.cropper-face {
  border-radius: 50%;
}

.img-preview-container {
  display: table;
  margin: 0 auto;
}
</style>
