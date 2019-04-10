class UsersController < ApplicationController

  def index
    # 現在のユーザーを除いて入力されたキーワードを含むnameカラムの値を検索する
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id)
    respond_to do |format|
      format.html #index.html.hamlへ
      format.json #index.json.jbuilderへ
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      renser :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
