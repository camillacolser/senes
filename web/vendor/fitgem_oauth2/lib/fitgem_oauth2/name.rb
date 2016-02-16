module FitgemOauth2
 class Client
   def name
     name_url = "1/user/#{user_id}/profile.json"
     puts name_url
     get_call(name_url)
   end
 end
end
