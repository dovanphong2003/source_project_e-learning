module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
        // Thêm @babel/plugin-syntax-dynamic-import vào đây
        "@babel/plugin-syntax-dynamic-import",
        // Đặt các plugin Babel khác của bạn ở đây (nếu có)
    ],
};
