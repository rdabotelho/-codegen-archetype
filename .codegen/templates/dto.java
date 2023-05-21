package com.example.demo.domain.dto;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.time.LocalDate;

public class DomainNameDto {

	private Long id;
	private String attribute;
	private OtherDto attribute;
	private List<OtherDto> attribute = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}

	public OtherDto getAttribute() {
		return attribute;
	}

	public void setAttribute(OtherDto attribute) {
		this.attribute = attribute;
	}

	public List<OtherDto> getAttribute() {
		return attribute;
	}

	public void setAttribute(List<OtherDto> attribute) {
		this.attribute = attribute;
	}

	@Override
	public String toString() {
		return "DomainNameDto{" +
			"id=" + id +
			'}';
	}

}