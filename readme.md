##Baka-Tsuki iOS Reader app		

iOS application build on top of ionic framework to read light Novel from baka-tsuki

Thanks to Shadowys for btapi (https://github.com/Shadowys/btapi)

There is another app based on phonegap/cordova which sould work on iOS here : https://github.com/Masclaux/LightReader

04/11/15 :			
v1.0.0 out (useable for reading and managing novel, yes favorites view is really slow, I will work on it soon - no download for now)				

**QUESTION**	
	- Keep Full Text ? Rename them accordingly to team name or just remove them ?

**TODO**    
	- (Low) CSS for novel detail    
	- (High) Remove downloaded volume/chapter    
	- (Low) Download epub/pdf to open them in iBooks (maybe)    
	- (Medium) Setting tab    
	- (Low) add more language		
	- (Medium) Write some test x)
	- (High - slow probably because need to fetch some images inside db > image on filesystem ?) Faster Favorites view			
	
**DONE**	
	- Novel List
	- Push Notification on app	
	- Force Refresh (ln list, detail ln & favorite)		
	- Search (ln list & favorite)	
	- Favorite (favorite, unfavorite - Still work with downloaded novel -, register/unregister push notification for novel)    	
	- Read by chapter (for volume maybe later)		
	
**WORKING ON**		
	- Download volume/chapter    	
	- Favorite novel detail and favorite read controller		
	
**TESTING**		
	- Server Push		
	
Feel free to open an issue/make pull request/ask for enhancement or point out what I'm doing wrong.    
But be careful I'm still learning how ionic/angular work and I'm not an experienced dev so I could make some mistake in my code, or I'm might not even be able to help you^^

**Novel with problem for now (the one know a last, open an issue if you found one not listed):**	
	- Some one_off novel have the wrong data (waiting for API fix)			 
	Please report the one with "Full text", "Also on ", etc and any other probleme :) 		

**Problem Novel Solved**		
	- (Yes) CtG—Zero_Kara_Sodateru_Dennou Shoujo (Error API - Solved)		
	- (Yes) Densetsu_no_Yūsha_no_Densetsu (infinite loading)		
	- (Yes) HEAVY OBJECT (Error API - Solved)		
	- (Yes) Kino_no_Tabi (Api error - Solved)		
	- (Yes) Onii-chan_Dakedo_Ai_Sae_Areba_Kankei_Nai_yo_ne— (API fix - Solved)		
	- (Yes) Ore_no_Imōto_ga_Konna_ni_Kawaii_Wake_ga_Nai (API problem - request `ō` wrongly encoded - Solved)	
	- (Yes) Ore ga Ojou-Sama Gakkou ni ‘Shomin Sample’ Toshite Usarareta Ken (API problem - Solved)		
	- (Yes) Seikoku_no_Ryuu_Kishi (waiting for API fix to go all volume - Solved)		
	- (Yes) Zero_no_Tsukaima (API Problem error : `Cannot read property '1' of null`)		
	- (Yes) Rokujouma_no_Shinryakusha! (App not sending final `?`)		
	- (Yes) Kore_wa_Zombie_desu_ka (App not sending final `?`)		
	- (Yes) Fate/Zero (App `/` is considered wrongly)		
	- (Yes) Gekkou (API `Cannot read property 'books' of undefined` - Api fix & App fix - Solved)		
	- (Yes) Remembrances_for_a_certain_pilot (Same problem as Gekkou - Api fix & App fix - Solved)		
	- (Yes) Tabi_ni_Deyou,_Horobiyuku_Sekai_no_Hate_Made (API error : `Cannot read property 'books' of undefined` - Api fix & App fix - Solved)		
	- (Yes) Yume_Nikki (API Problem error : `Cannot read property 'books' of undefined` - Api fix & App fix - Solved)			
	- (Yes) Iris_on_Rainy Days (Api formatting data - Api fix working on - Solved)		
	- (Yes) Mokushiroku_Arisu (Api formatting data - Api fix working on - Solved)		
	- (Yes) Sugar_Dark (Broken volume list API - Api fix working on - Solved)		
	- (Yes) Toradora! (API problem with Alternative Adaptation part - Api fix working on - Solved)		

	
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/AzSiAz/ln-reader/trend.png)](https://bitdeli.com/free "Bitdeli Badge")