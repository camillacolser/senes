module FitgemOauth2
 class Client
   def name
     name_url = "1/user/#{user_id}/profile.json"
     get_call(name_url)
   end
 end
end
