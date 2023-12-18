# 检查 data.txt 文件是否存在
if [ ! -s "data.txt" ]; then
    echo "data.txt 文件为空或不存在，运行前请先进行如下操作\n1-安装油猴脚本 2-打开https://www.xiaohongshu.com/explore 3-复制新页面中的数据到data.txt中"
    exit 1
fi

# 运行 crawlerTool.py
python crawlerTool.py

# 检查 crawlerTool.py 的退出状态
if [ $? -ne 0 ]; then
    echo "crawlerTool.py 运行出现问题"
    exit 1
fi

echo "执行完毕"