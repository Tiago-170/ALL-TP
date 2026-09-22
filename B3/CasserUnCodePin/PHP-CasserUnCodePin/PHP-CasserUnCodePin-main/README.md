# PHP-CasserUnCodePin

```
<?php
	$start = microtime(true);
	echo "Début du programme\n";
	$codeSecret = rand(0, 9999);
	$trouve = false;
	$i = 0;
	while ($i < 10000 && !$trouve){
		echo "\nCode testé: " . $i . " ";
		if ($i == $codeSecret){
			$trouve = true;
			echo "\nLe code est : " . $i . "\n";
		}
		$i++;
	}
	echo "Fin du programme\n";
	$duree = microtime(true) - $start;
	echo "Durée du programme : " . $duree . " secondes\n";
?>
```

Début du programme
Le code est : 1802
Fin du programme
Durée du programme : 0.0039830207824707 secondes
