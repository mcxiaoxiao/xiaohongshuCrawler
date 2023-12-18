import requests
from bs4 import BeautifulSoup
from tqdm import tqdm

# 读取data.txt文件中的数据
with open('data.txt', 'r', encoding='utf-8') as file:
    data = file.readlines()

# 发送HTTP GET请求获取页面内容，并提取<meta>标签的content
def get_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    meta_tag = soup.find('meta', attrs={'name': 'description'})
    content = meta_tag.get('content') if meta_tag else ''
    return content

# 创建文本文件并写入数据
with open('output.txt', 'w', encoding='utf-8') as txtfile:
    # 提取数据并写入文本文件
    for i, line in enumerate(tqdm(data[1:], desc='提取进度'), 1):
        line = line.strip()
        article_id, title = line.split(': ')
        url = f'https://www.xiaohongshu.com/explore/{article_id}'
        content = get_content(url)
        txtfile.write(f'序号: {i}\n')
        txtfile.write(f'链接: {url}\n')
        txtfile.write(f'标题: {title}\n')
        txtfile.write(f'内容: {content}\n\n')

print("提取完成并已保存到output.txt文件中。")
