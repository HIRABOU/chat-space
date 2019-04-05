class Api::MessagesController < ApplicationController
  def index
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json { @messages = @messages.where("id > ?", params[:last_id]) }
    end
  end


  private

  def set_group
    @group = Group.find(params[:group_id])
  end
end
