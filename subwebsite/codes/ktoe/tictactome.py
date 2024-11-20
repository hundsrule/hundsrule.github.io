import fpdf
from itertools import product
import copy

class TicTacToeBook:
    def __init__(self):
        self.pdf = fpdf.FPDF()
        self.pages = {}  # 存储所有页面状态
        self.current_page = 1
        
    def create_empty_board(self):
        return [['' for _ in range(3)] for _ in range(3)]
    
    def is_winner(self, board, player):
        # 检查行
        for row in board:
            if all(cell == player for cell in row):
                return True
                
        # 检查列
        for col in range(3):
            if all(board[row][col] == player for row in range(3)):
                return True
                
        # 检查对角线
        if all(board[i][i] == player for i in range(3)):
            return True
        if all(board[i][2-i] == player for i in range(3)):
            return True
            
        return False
    
    def is_board_full(self, board):
        return all(cell != '' for row in board for cell in row)
    
    def get_empty_positions(self, board):
        return [(i, j) for i, j in product(range(3), range(3)) if board[i][j] == '']
    
    def minimax(self, board, depth, is_maximizing):
        if self.is_winner(board, 'O'):
            return 10 - depth
        if self.is_winner(board, 'X'):
            return depth - 10
        if self.is_board_full(board):
            return 0
            
        if is_maximizing:
            best_score = float('-inf')
            for i, j in self.get_empty_positions(board):
                board[i][j] = 'O'
                score = self.minimax(board, depth + 1, False)
                board[i][j] = ''
                best_score = max(best_score, score)
            return best_score
        else:
            best_score = float('inf')
            for i, j in self.get_empty_positions(board):
                board[i][j] = 'X'
                score = self.minimax(board, depth + 1, True)
                board[i][j] = ''
                best_score = min(best_score, score)
            return best_score
    
    def get_best_move(self, board):
        best_score = float('-inf')
        best_move = None
        
        for i, j in self.get_empty_positions(board):
            board[i][j] = 'O'
            score = self.minimax(board, 0, False)
            board[i][j] = ''
            
            if score > best_score:
                best_score = score
                best_move = (i, j)
                
        return best_move
    
    def draw_board(self, board):
        self.pdf.add_page()
        
        # 设置字体
        self.pdf.set_font('Arial', 'B', 16)
        
        # 绘制棋盘
        start_x = 50
        start_y = 50
        cell_size = 30
        
        for i in range(4):
            self.pdf.line(start_x, start_y + i*cell_size, 
                         start_x + 3*cell_size, start_y + i*cell_size)
            self.pdf.line(start_x + i*cell_size, start_y,
                         start_x + i*cell_size, start_y + 3*cell_size)
        
        # 绘制棋子
        for i, j in product(range(3), range(3)):
            if board[i][j]:
                x = start_x + j*cell_size + cell_size/2
                y = start_y + i*cell_size + cell_size/2
                self.pdf.text(x-4, y+4, board[i][j])
        
        # 添加页码
        self.pdf.text(180, 280, str(self.current_page))
        
        # 添加可选位置说明
        empty_positions = self.get_empty_positions(board)
        if empty_positions:
            self.pdf.set_font('Arial', '', 12)
            y = start_y + 120
            self.pdf.text(start_x, y, "可选位置：")
            for i, (row, col) in enumerate(empty_positions):
                pos_num = row * 3 + col + 1
                next_page = self.get_next_page_number(board, (row, col))
                self.pdf.text(start_x, y + 10 + i*10, 
                            f"位置 {pos_num}：翻到第 {next_page} 页")
    
    def get_next_page_number(self, current_board, move):
        next_board = copy.deepcopy(current_board)
        row, col = move
        next_board[row][col] = 'X'
        
        # 计算AI的回应
        if not self.is_winner(next_board, 'X') and not self.is_board_full(next_board):
            ai_move = self.get_best_move(next_board)
            if ai_move:
                next_board[ai_move[0]][ai_move[1]] = 'O'
        
        # 生成状态的唯一标识
        board_str = ''.join(''.join(row) for row in next_board)
        if board_str not in self.pages:
            self.pages[board_str] = len(self.pages) + 2  # 第一页是说明页
        
        return self.pages[board_str]
    
    def generate_book(self):
        # 添加说明页
        self.pdf.add_page()
        self.pdf.set_font('Arial', 'B', 16)
        self.pdf.text(20, 20, "井字棋游戏书")
        self.pdf.set_font('Arial', '', 12)
        self.pdf.text(20, 40, "游戏规则：")
        self.pdf.text(20, 50, "1. 玩家使用 X，书使用 O")
        self.pdf.text(20, 60, "2. 选择空位置后按提示翻页")
        self.pdf.text(20, 70, "3. 三子连线者获胜")
        
        # 生成所有可能的状态
        initial_board = self.create_empty_board()
        self.generate_all_states(initial_board)
        
        # 保存PDF
        self.pdf.output("tic_tac_toe_book.pdf")
    
    def generate_all_states(self, board, is_x_turn=True):
        board_str = ''.join(''.join(row) for row in board)
        if board_str in self.pages:
            return
            
        self.pages[board_str] = self.current_page
        self.draw_board(board)
        self.current_page += 1
        
        if self.is_winner(board, 'X') or self.is_winner(board, 'O') or self.is_board_full(board):
            return
            
        for i, j in self.get_empty_positions(board):
            next_board = copy.deepcopy(board)
            if is_x_turn:
                next_board[i][j] = 'X'
                if not self.is_winner(next_board, 'X'):
                    ai_move = self.get_best_move(next_board)
                    if ai_move:
                        next_board[ai_move[0]][ai_move[1]] = 'O'
                self.generate_all_states(next_board, True)

if __name__ == "__main__":
    book = TicTacToeBook()
    book.generate_book()

