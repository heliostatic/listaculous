class ListsController < ApplicationController
  before_filter :authorized_user, :except => [:create]
  before_filter :authorized_creator, :only => [:create]
  # GET /lists
  # GET /lists.xml
  def index
    @lists = List.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @lists }
    end
  end

  # GET /lists/1
  # GET /lists/1.xml
  def show
    @list = List.find(params[:id])
    
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @list }
      format.json { render :json => @list, :methods => :children}
    end
  end

  # GET /lists/new
  # GET /lists/new.xml
  def new
    @list = List.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @list }
    end
  end

  # GET /lists/1/edit
  def edit
    @list = List.find(params[:id])
  end

  # POST /lists
  # POST /lists.xml
  def create
    @list = List.new(params[:list])
    @tstamp = params[:extra][:tstamp]
    respond_to do |format|
      if @list.save
        format.html { redirect_to(@list, :notice => 'List was successfully created.') }
        format.xml  { render :xml => @list, :status => :created, :location => @list  }
        format.js 
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @list.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /lists/1
  # PUT /lists/1.xml
  def update
    @list = List.find(params[:id])
    respond_to do |format|
      if params.has_key? [:list] 
        action_type = params[:list][:case]
      else
        action_type = params[:case]
      end

      case action_type
      when 'sort_in_place'
        @list.move(params[:poschange].to_i)
        format.html { redirect_to(@list, :notice => "List was successfully updated.") }
        format.xml  { head :ok }
        format.js { render :text => "yep"}
      when 'sort_across_lists'
        @list.remove_from_list
        @list.parentlist_id = params[:new_parent]
        @list.insert_at(params[:new_position].to_i + 1)
      when 'status'
        if @list.update_attributes({:status => params[:list][:status]}) # position didn't change
          format.html { redirect_to(@list, :notice => "List was successfully updated.") }
          format.js   { render :text => "$('#' + #{@list.id}).toggleClass('finished');" }
          format.xml  { head :ok }
        else
          format.html { render :action => "edit" }
          format.xml  { render :xml => @list.errors, :status => :unprocessable_entity }
        end
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @list.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /lists/1
  # DELETE /lists/1.xml
  def destroy
    @list = List.find(params[:id])
    @list.destroy

    respond_to do |format|
      format.html { redirect_to(lists_url) }
      format.xml  { head :ok }
    end
  end
  
  def finish
    @task = List.tasks[params[:id]]
    new_status = {:status => true}
    @task.update_attributes(new_status)

    respond_to do |format|
      format.js
    end
   end
   
   # TODO: Add a respond to block for JSON to give a consumer friendly response for those using the API
   def show_children
    @list = List.find(params[:id])
    @cssid = @list.id
    render :partial => 'lists/list' if @list.has_children?
   end
   
   private
   
   def authorized_user
     unless current_user.id == List.find(params[:id]).owner_id 
       flash[:error] = "Fuck off"
     end
   end
   
   def authorized_creator
     unless current_user.id == params[:list][:owner_id].to_i
       flash[:notice] = "Fuck off"
     end 
   end
end
