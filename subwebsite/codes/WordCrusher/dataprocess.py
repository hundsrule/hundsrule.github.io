def process_word_list(input_file, output_file):
    # 读取输入文件
    words = []
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            for i, line in enumerate(f):
                if i >= 1500:  # 只处理前1500行
                    break
                word = line.split()[0]  # 分割每行并只取单词部分
                words.append(word)
    except FileNotFoundError:
        print(f"找不到输入文件: {input_file}")
        return
    
    # 生成输出格式
    formatted_words = "const words = [" + ", ".join(f"'{word}'" for word in words) + "];"
    
    try:
        # 写入输出文件
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(formatted_words)
        print(f"成功写入输出文件: {output_file}")
    except Exception as e:
        print(f"写入输出文件时出错: {e}")

# 使用示例
input_file = 'en_50k.txt'  # 输入文件名
output_file = 'formatted_words.txt'  # 输出文件名
process_word_list(input_file, output_file)
