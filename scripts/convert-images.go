package main

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strings"
)

const (
	assetDir    = "./assets/images"
	staticDir   = "./static/images"
)

// TODO: read from config file
var widths = []int{
	650,
	500,
	400,
}

var quality = map[string]int {
	".jpg"  : 70,
	".png"  : 90,
	".webp" : 40,
}

type conversion struct {
	Format  string
	InFile  string
	Resize  int
	Quality int
}

func main() {
	// get image assets
	images, err := assets(assetDir)
	if err != nil {
		panic(err)
	}

	// TODO: parallelize this
	// copy and convert each image as necessary
	for _, image := range images {

		// only convert jpg and png images
		ext := filepath.Ext(image)
		if ext != ".jpg" && ext != ".png" {
			continue
		}

		// determine the quality setting appropriate for the format
		q, ok := quality[ext]
		if !ok {
			panic(fmt.Errorf("quality unavaiable for %s", ext))
		}

		// generate conversions for each width
		for _, w := range widths {
			convert(conversion{
				InFile: image,
				Format: ext,
				Resize: w,
				Quality: q,
			})
			convert(conversion{
				InFile: image,
				Format: ".webp",
				Resize: w,
				Quality: quality[".webp"],
			})
		}
	}
}

// assets returns all image asset paths
func assets(assetDir string) ([]string, error) {
	var images []string

	// read images in the asset directory
	err := filepath.Walk(assetDir, func(path string, info os.FileInfo, err error) error {

		// ignore directories
		if info.IsDir() {
			return nil
		}

		images = append(images, path)
		return nil
	})

	if err != nil {
		return []string{}, fmt.Errorf("failed to walk asset directory: %v", err)
	}

	return images, nil
}

// convert the image
func convert(con conversion) {
	// assemble the outfile path
	stem    := strings.TrimSuffix(path.Base(con.InFile), path.Ext(con.InFile))
	outfile := fmt.Sprintf(
		"%s/%s-%dw%s",
		staticDir,
		stem,
		con.Resize,
		con.Format,
	)

	// do nothing if the file already exists
	if _, err := os.Stat(outfile); err == nil {
		return
	}

	// run convert on the shell
	fmt.Printf("building: %s (quality: %d)\n", outfile, con.Quality)
	cmd := exec.Command(
		"convert",
		con.InFile,
		"-quality",
		fmt.Sprintf("%d", con.Quality),
		"-resize",
		fmt.Sprintf("%d", con.Resize),
		outfile,
	)

	var stderr bytes.Buffer
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		panic(fmt.Errorf("convert failed: %v, %s", err, stderr.String()))
	}
}
